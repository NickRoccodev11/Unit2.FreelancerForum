
//mock database of freelancers
const names = ["Bobby", "Jane", "Sasha", "Denise", "Alfred", "Rupert", "Gerald", "Esther", "Alice", "Cristoph", "Arnold", "Sandra", "Mitchell"];
const occupations = ["Teacher", "Engineer", "Tutor", "Carpenter", "Scientist", "Web Developer", "Manager", "Director", "Artist", "Designer", "Physical Therapist", "Conductor", "Writer", "Actor", "Singer", "Dog Trainer"];
const prices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

//Elements to Grab
const message = document.querySelector("#message");
const table = document.querySelector("table");


//functions for highlighting a hovered row:
const highlightRow = (row) => {
  row.classList.add("highlighted")
}
const removeHighlight = (row) => {
  row.classList.remove("highlighted")
}

//array and functions for updating average freelancer price:
const freelancerPrices = [];
const updateAverage = (flPrices) => {
  const total = flPrices.reduce((acc, cur) => acc + cur, 0);
  const average = total / flPrices.length
  updateMessage(average);
}
const updateMessage = (avg) => {
  const fixedAvg = avg.toFixed(2)
  message.innerText = `Average Freelancer Price: ${fixedAvg}$/hr`
}

//freelancer array
const freelancers = [
  {
    name: "Clyde",
    job: "Web Devloper",
    price: 100
  },
  {
    name: "Bonnie",
    job: "Engineer",
    price: 120
  },
];


//generating a new freelancer
const generateFreelancer = () => {
  //random table entry generators
  const currentPerson = names[Math.floor(Math.random() * names.length)];
  const currentPrice = prices[Math.floor(Math.random() * prices.length)];
  const currentJob = occupations[Math.floor(Math.random() * occupations.length)];

  //format freelancer object and push to fl array
  const newFreelancer = {
    name: currentPerson,
    job: currentJob,
    price: currentPrice,
  }
  freelancers.push(newFreelancer);

  //grab current price to use for our average
  freelancerPrices.push(currentPrice);

  //create the table row and data 
  const row = document.createElement("tr");
  const nameData = document.createElement("td");
  nameData.innerText = freelancers[freelancers.length - 1].name;
  const jobData = document.createElement("td");
  jobData.innerText = freelancers[freelancers.length - 1].job;
  const priceData = document.createElement("td");
  priceData.innerText = `${freelancers[freelancers.length - 1].price} $`;

  //append the data to the row, and then to the table
  row.appendChild(nameData);
  row.appendChild(jobData);
  row.appendChild(priceData);
  table.appendChild(row)

  //eventlisteners for calling the highlighting functions:
  row.addEventListener("mouseover", () => {
    highlightRow(row);
  });
  row.addEventListener("mouseout", () => {
    removeHighlight(row);
  });

  //update average price message
  updateAverage(freelancerPrices);
}

//function for initializing list with our two starting freelancers:
const initializeList = (flList) => {
  flList.forEach(freelancer => {
    const row = document.createElement("tr");
    const nameData = document.createElement("td");
    nameData.innerText = freelancer.name;
    const jobData = document.createElement("td")
    jobData.innerText = freelancer.job;
    const priceData = document.createElement("td")
    priceData.innerText = `${freelancer.price} $`
    row.appendChild(nameData);
    row.appendChild(jobData);
    row.appendChild(priceData);
    table.appendChild(row);
    freelancerPrices.push(freelancer.price)
    updateAverage(freelancerPrices);
    row.addEventListener("mouseover", () => {
      highlightRow(row);
    });
    row.addEventListener("mouseout", () => {
      removeHighlight(row);
    });
  });
}

//initialize and start adding to the list:
initializeList(freelancers)
setInterval(generateFreelancer, 3000);

