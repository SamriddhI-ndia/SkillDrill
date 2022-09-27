import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

var surveyJson = {  
    pages: [
      {
        "elements": [
          {
            "type": "matrix",
            "name": "Quality",
            "title": "Please indicate if you agree or disagree with the following statements",
            "columns": [
              {
                "value": 1,
                "text": "1"
              },
              {
                "value": 2,
                "text": "2"
              },
              {
                "value": 3,
                "text": "3"
              },
              {
                "value": 4,
                "text": "4"
              }, {
                "value": 5,
                "text": "5"
              }
            ],
            "rows": [
              {
                "value": "education",
                "text": "Education/Training"
              }, {
                "value": "experience",
                "text": "Work Experience"
              }, {
                "value": "technical skills",
                "text": "Skills (Technical)"
              }, {
                "value": "verbal communication",
                "text": "Verbal Communication"
              }, {
                "value": "enthusiasm",
                "text": "Candidate Enthusiasm"
              }, {
                "value": "knowledge of Our Company",
                "text": "Knowledge of Our Company"
              }, {
                "value": "value customer",
                "text": "Valuing Customers"
              }, {
                "value": "moving to action",
                "text": "Moving to Action"
              }, {
                "value": "working in collaboration",
                "text": "Working Collaboratively"
              }, {
                "value": "planning",
                "text": "Planning and Organizing Projects"
              },
            ]
          }, {
            "type": "rating",
            "name": "satisfaction",
            "title": "Overall impression of the candidate:",
            "isRequired": true,
            "mininumRateDescription": "Not Satisfied",
            "maximumRateDescription": "Completely satisfied"
          }, {
            "type": "comment",
            "name": "suggestions",
            "title": "Please provide any final comments and your recommendations for proceeding with the candidate."
          }
        ]
      }
    ]
  };
StylesManager.applyTheme("defaultV2");
const Report = () => {
    const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}
 
export default Report;