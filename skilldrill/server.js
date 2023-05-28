const express = require("express");
const bcrypt = require("bcrypt");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/components/mainWindow/Actions");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const rooms = [];
let theSocketId = "";

const saltRounds = 10;

const { user, room, feedback } = require("./mongo");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
async function callDb(clients, roomId) {
	const checkRoom = await room.findOne({ roomId: roomId }, { _id: 0 });
	console.log("checkRoom", checkRoom);
	if (checkRoom) {
		console.log("present in db");
		await room.updateMany({ roomId: roomId }, { $set: { client: clients } });
	} else {
		console.log("not in db");
		await room.insertMany({ roomId: roomId, client: clients });
	}
}

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const userFound = await user.findOne({ email: email });
		//console.log("checkEmail", checkEmail);
		if (userFound) {
			const match = await bcrypt.compare(password, userFound.password);
			console.log(userFound.password);
			if (!match) {
				res.json({ status: "incorrect password" });
			} else {
				console.log("Exist");

				res.json({ status: "exist", username: userFound.username });
			}
		} else {
			console.log("NotExist");
			res.json({ status: "notExist" });
		}
	} catch (e) {
		res.json(e);
	}
});

app.post("/signup", async (req, res) => {
	const { email, password, username } = req.body;
	const encrypted_password = bcrypt
		.genSalt(saltRounds)
		.then((salt) => {
			console.log("Salt: ", salt);
			return bcrypt.hash(password, salt);
		})
		.then((hash) => {
			console.log("Hash: ", hash);
			const data = {
				email: email,
				password: hash,
				username: username,
			};

			async function saveInDB() {
				try {
					const checkEmail = await user.findOne({ email: email });
					const checkUserName = await user.findOne({ username: username });
					if (checkEmail) {
						res.json("Already exist");
					} else if (checkUserName) {
						res.json("username exist");
					} else {
						res.json("notExist");
						await user.insertMany([data]);
					}
				} catch (e) {
					res.json(e);
				}
			}
			saveInDB();
		})
		.catch((err) => console.error(err.message));
});

app.get("/report/:id", async (req, res) => {
	const id = req.params.id;
	const user = await room.findOne({ roomId: id }, { _id: 0, roomId: 0 });
	res.json(user);
});

app.post("/expressions", async (req, res) => {
	const clientUsername = req.body.username;
	const roomId = req.body.roomId;
	const expressions = req.body.expressions;
	try {
		const checkForUser = await feedback.findOne({ to: clientUsername });
		if (checkForUser) {
			const checkForRoomId = await feedback.findOne({
				to: clientUsername,
				info: { $elemMatch: { roomId: roomId } },
			});
			if (checkForRoomId) {
				await feedback.updateMany(
					{
						to: clientUsername,
						info: [{ roomId: roomId }],
					},
					{
						$set: {
							"info.$.expressions": expressions,
						},
					}
				);
			} else {
				await feedback.updateMany(
					{
						to: clientUsername,
					},
					{
						$push: {
							info: [
								{
									roomId: roomId,
									expressions: expressions,
								},
							],
						},
					}
				);
			}
		} else {
			await feedback.insertMany({
				to: clientUsername,
				info: [{ roomId: roomId, expressions: expressions }],
			});
		}
	} catch (e) {
		console.log(e);
	}
});

app.post("/feedback", async (req, res) => {
	const data = req.body;
	const interviewee = data.to;
	const roomId = data.info.roomId;
	try {
		const checkForUser = await feedback.findOne({ to: interviewee });
		if (checkForUser) {
			const checkForRoomId = await feedback.findOne({
				to: interviewee,
				info: { $elemMatch: { roomId: roomId } },
			});
			if (checkForRoomId) {
				await feedback.updateMany(
					{ to: interviewee, "info.roomId": roomId },
					{
						$set: {
							"info.$.by": data.info.by,
							"info.$.feedback": data.info.feedback,
							"info.$.roomId": data.info.roomId,
						},
					}
				);
			} else {
				await feedback.updateMany(
					{
						to: interviewee,
					},
					{
						$push: {
							info: [
								{
									by: data.info.by,
									feedback: data.info.feedback,
									roomId: data.info.roomId,
								},
							],
						},
					}
				);
			}
		} else {
			await feedback.insertMany({ to: data.to, info: [data.info] });
		}
		res.json("Successful");
	} catch (e) {
		res.json("error");
	}
});

app.get("/reportCard/:id", async (req, res) => {
	const user = req.params.id;
	console.log("user", user);
	const data = await feedback.findOne({ to: user }, { _id: 0 });
	console.log("look", data);
	res.json(data.info);
});

app.get("/expression/:username/:id", async (req, res) => {
	const username = req.params.username;
	const roomId = req.params.id;
	const data = await feedback.findOne({
		to: username,
		info: { $elemMatch: { roomId: roomId } },
	});
	res.json(data.info);
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
	return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
		(socketId) => {
			return {
				socketId,
				username: userSocketMap[socketId][0],
				status: userSocketMap[socketId][1],
			};
		}
	);
}

io.on("connection", (socket) => {
	//console.log('socket connected');
	socket.on(ACTIONS.JOIN, ({ roomId, username, socketId, isInterviewee }) => {
		// console.log('status', isInterviewee)
		userSocketMap[socket.id] = [username, isInterviewee];
		if (rooms[roomId]) rooms[roomId].push({ username, socketId });
		else {
			rooms[roomId] = [];
			rooms[roomId].push({ username, socketId });
		}
		theSocketId = socketId;
		socket.join(roomId);
		socket.to(roomId).emit("peer-joined", { socketId, username });
		const clients = getAllConnectedClients(roomId);

		//console.log(clients);
		socket.emit("get-roomId", {
			roomId: roomId,
		});
		callDb(clients, roomId);

		rooms[roomId].forEach(({ socketId }) => {
			io.to(socketId).emit(ACTIONS.JOINED, {
				rooms: rooms,
				clients: rooms[roomId],
				username,
				socketId,
			});
		});
	});

	socket.on(ACTIONS.WHITEBOARD_CHANGE, ({ roomId, canvasImage }) => {
		console.log("yaaahhhhaaaaaa");
		//console.log(canvasImage);
		socket.in(roomId).emit(ACTIONS.WHITEBOARD_CHANGE, { canvasImage });
	});

	socket.on(ACTIONS.SYNC_WHITEBOARD, ({ socketId, canvasImage }) => {
		io.to(socketId).emit(ACTIONS.WHITEBOARD_CHANGE, { canvasImage });
	});

	socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
		socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
	});

	socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
		io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
	});

	socket.on("disconnecting", ({ peerId, roomId }) => {
		// const rooms = [...socket.rooms];
		// rooms.forEach((roomId)=>{
		//     socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
		//         socketId: theSocketId,
		//         username: rooms[roomId].
		//     })
		// })
		// delete userSocketMap[theSocketId];
		if (rooms[roomId]) {
			rooms[roomId] = rooms[roomId].filter((el) => el.roomId != roomId);
			socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
				socketId: peerId,
				username: rooms[roomId].username,
			});
		}
		//socket.leave();
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
