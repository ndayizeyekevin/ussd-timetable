const schedule = require("./data.js");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/// response formarter
const responseFormarter = (data) => {
  let respBody = "";
  let footer = "";
  data.options.forEach((option, index) => {
    respBody += ` ${++index}. ${option} \n`;
  });
  if (data.footerOption.length) {
    data.footerOption.forEach((item) => {
      console.log(item);
      footer += ` ${item.option}. ${item.name} \n`;
    });
  }
  return `${data.type} ${data.title} \n ${respBody} ${footer}`;
};

// option formarter
const optionsFormarter = (day) => {
  let daydata;
  switch (day) {
    case 1:
      daydata = schedule.schedule.Monday;
      break;
    case 2:
      daydata = schedule.schedule.Tuesday;
      break;
    case 3:
      daydata = schedule.schedule.Wednesday;
      break;
    case 4:
      daydata = schedule.schedule.Thursday;
      break;
    case 5:
      daydata = schedule.schedule.Friday;
      break;
    default:
      daydata = schedule.schedule.Monday;
  }
  return daydata.map((item) => {
    const subject = item.subject == "" ? "FREE" : item.subject;

    return item.time.replace(" AM", "").replace(" PM", "") + " => " + subject;
  });
};

// getcourse info
let getCourseInfo = (daychoice, choice) => {
  let course;
  switch (daychoice) {
    case "1":
      course = schedule.schedule.Monday[choice - 1];
      break;
    case "2":
      course = schedule.schedule.Tuesday[choice - 1];
      break;
    case "3":
      course = schedule.schedule.Wednesday[choice - 1];
      break;
    case "4":
      course = schedule.schedule.Thursday[choice - 1];
      break;
    case "5":
      course = schedule.schedule.Friday[choice - 1];
      break;

    default:
      break;
  }
  try {
    return `END Module Code:
    ${course.subject} 
    Lecturer: 
    ${course.instructor}
    Time: 
    ${course.time}
    `;
  } catch (error) {
    console.log(schedule.schedule.Monday[choice - 1], daychoice);
  }
};

// response generator
const responseGenerator = (text) => {
  const choiceslevel = text == "" ? 0 : text.split("*").length;
  const lastchoice = text == "" ? 0 : Number(text.split("*")[choiceslevel - 1]);
  const userChoices = text.split("*");
  let data;
  switch (choiceslevel) {
    case 0:
      data = {
        title: "Welcome to IT Level 7  ",
        options: days,
        footerOption: [{ name: "exit", option: "0" }],
        type: "CON",
      };
      return responseFormarter(data);
      break;
    case 1:
      if (lastchoice === "0" && choiceslevel > 0) {
        return "END Thank you for using Our Service";
      }
      let dayIndex = lastchoice - 1;
      if (isNaN(dayIndex) || dayIndex > 5 || dayIndex < 0)
        return "END Invalid day Entered";
      data = {
        title: `${days[dayIndex]}'s Time Table`,
        options: optionsFormarter(dayIndex),
        footerOption: [{ name: "exit", option: "0" }],
        type: "CON",
      };
      return responseFormarter(data);
      break;
    case 2: {
      let daychoice = userChoices[choiceslevel - 2];
      return getCourseInfo(daychoice, lastchoice);
    }
    default:
      break;
  }
};

module.exports = responseGenerator;
