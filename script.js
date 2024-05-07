document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const cells = [];
    let isHardMode = true; // Flag to track current difficulty mode
    
    // Create the grid
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells.push(cell);
        grid.appendChild(cell);
      }
    }
    
    // Function to toggle a cell and its neighbors for easy level
    function toggleCellEasy() {
      this.classList.toggle("is-off");
      checkWin(); // Check if all cells are off after toggling
    }
  
    // Function to toggle a cell and its neighbors for hard level
    function toggleCellHard(row, col) {
      const directions = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
          const cell = cells[newRow * 5 + newCol];
          cell.classList.toggle("is-off");
        }
      }
      checkWin(); // Check if all cells are off after toggling
    }
    
    // Randomly configure the board
    function configureBoard() {
      for (let i = 0; i < 10; i++) {
        const randomCell = cells[Math.floor(Math.random() * 25)];
        const row = parseInt(randomCell.dataset.row);
        const col = parseInt(randomCell.dataset.col);
        toggleCellHard(row, col);
      }
    }
    
    // Function to check if all cells are off
    function checkWin() {
      const allOff = cells.every(cell => cell.classList.contains("is-off"));
      if (allOff) {
        alert("Well done... You win!");
      }
    }
  
    // Button event listener for starting the game
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
      const difficulty = prompt("Choose difficulty level: 1. Easy 2. Hard");
      if (difficulty === "1") {
        isHardMode = false;
      } else if (difficulty !== "2") {
        alert("Invalid input. Please choose 1 for Easy or 2 for Hard.");
        return;
      }
      cells.forEach(cell => {
        cell.removeEventListener("click", toggleCellEasy);
        cell.removeEventListener("click", toggleCellHard);
        if (isHardMode) {
          cell.addEventListener("click", function() {
            const row = parseInt(this.dataset.row);
            const col = parseInt(this.dataset.col);
            toggleCellHard(row, col);
          });
        } else {
          cell.addEventListener("click", toggleCellEasy);
        }
      });
      configureBoard();
      document.getElementById("options").style.display = "none"; // Hide options
      document.querySelector(".grid").style.display = "grid"; // Show grid
    });
    const instructionsButton = document.getElementById("instructionsButton");
    const addendumButton = document.getElementById("addendumButton");
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const closePopupButton = document.getElementById("closePopupButton");
    
    instructionsButton.addEventListener("click", () => {
      popupContent.innerHTML = `
      <h2>Instructions</h2>
      <ul>
      <li>Click on any light to toggle it and its neighboring lights.</li>
      <li>The starting configuration of the lights is random.</li>
      <li>Your objective is to turn off all the lights on the game board.</li>
      <li>Winning condition: You win when all lights are turned off.</li>
      </ul>
      <h3>Tips:</h3>
      <ul>
        <li>Start by identifying patterns and clusters of lights that can be turned off together.</li>
        <li>Focus on turning off lights that are surrounded by other turned-off lights, as they won't affect neighboring lights.</li>
        <li>Don't rush! Take your time to analyze the board before making your moves.</li>
        <li>If you get stuck, try undoing your recent clicks and approaching the puzzle from a different angle.</li>
        <li>Practice makes perfect! The more you play, the better you'll become at identifying efficient solutions.</li>
      </ul>
    `;
      popup.classList.add("active");
    });
  
    addendumButton.addEventListener("click", () => {
      popupContent.innerHTML = `<h2>Addendum</h2>
      <p>
      During the development of the Lights Out game, I embarked on a meticulous process that involved careful planning, iterative design, and strategic decision-making. <br>
        <strong>Conceptualization:</strong> The process started with brainstorming sessions to conceptualize game mechanics and design. I aimed for a simple yet challenging puzzle game inspired by classic grid-based puzzles.
      </p>
      <p>
        <strong>Prototyping:</strong> Initial prototypes using HTML, CSS, and JavaScript helped experiment with mechanics and UI elements. Iterations refined mechanics and visuals for a better player experience.
      </p>
      <p>
        <strong>Development:</strong> Translating prototypes into a fully functional game involved coding the board, implementing toggling, and integrating features like difficulty levels. Emphasis was on clean, modular code for scalability.
      </p>
      <h3>Key Choices:</h3>
      <ul>
        <li><strong>Algorithm Optimization:</strong> I prioritized optimizing the algorithm responsible for toggling lights and their neighboring cells to ensure smooth and efficient gameplay across different board configurations.</li>
        <li><strong>User-Centric Design:</strong> I focused on creating an intuitive and visually appealing user interface, with clear visual cues and interactive elements to guide players through the game.</li>
        <li><strong>Difficulty Levels:</strong> Implementing two difficulty levels—easy and hard—allowed me to cater to players of varying skill levels and provide a tailored gaming experience for both casual and experienced players.</li>
      </ul>
      <h3>Challenges faced and how I overcame them:</h3>
      <p>
        Overcoming challenges in implementing two difficulty levels—easy and hard—required a thorough analysis of the game dynamics and strategic code adjustments. For the easy level, I simplified gameplay by allowing individual light toggling, while for the hard level, I maintained the original mechanics, toggling both the clicked cell and its neighbors. These changes ensured distinct experiences for players of different skill levels.
      </p>
      <h3>Insights Gained:</h3>
      <p>
        Through the development process, I gained valuable insights into problem-solving, user-centered design, and iterative development. I learned to embrace challenges, seek feedback, and continuously iterate on the design to create a polished and engaging game that I'm proud of. Overall, the process was both challenging and rewarding, deepening my understanding of game development and strengthening my skills as a developer.
      </p>
      `;
      
      popup.classList.add("active");
    });
  
    closePopupButton.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  
  
  
    // Check if game is started previously
    const gameStarted = localStorage.getItem("gameStarted");
    if (gameStarted) {
      document.getElementById("options").style.display = "none";
      document.querySelector(".grid").style.display = "grid";
    }
  });
  