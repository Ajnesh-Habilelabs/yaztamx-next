import React, { useEffect, useState } from 'react';

const SkillArrayDesign = (props) => {
  const { arrayString } = props;
  const [finalString, setFinalString] = useState('');
  // console.log("(((((((((((+++))))))))))))", arrayString);

  useEffect(() => {
    if (arrayString !== '' || arrayString !== null) {
      const array = String(arrayString).split(',');
      const newArray = array.map((skill) => {
        var lowerCaseSkill = String(skill).toLowerCase();
        return skill.charAt(0).toUpperCase() + lowerCaseSkill.slice(1);
      });
      // skills
      // ? skills.length === 3
      //   ? skills?.join().toUpperCase() + ',FULL SERVICE'
      //   : skills?.join().toUpperCase()
      // : '',
      var newString;
      if (newArray.length === 4) {
        newArray.pop();
        newString = String(Array(newArray).join()).replaceAll(',', ', ');
      } else {
        newString = String(Array(newArray).join()).replaceAll(',', ', ');
      }

      // console.log("(((((((((((---))))))))))))", newString);
      setFinalString(newString);
    } else {
      setFinalString('-');
    }
  }, [arrayString]);

  return `${finalString}`;
};

export default SkillArrayDesign;
