let dimension = 0;
    let matrix = [];
    let stepsContainer = document.getElementById("steps");

    // Function to initialize matrix based on dimension input
    function setupMatrix() {
      dimension = parseInt(document.getElementById("dimension").value);
      if (dimension < 2) return alert("Dimension must be at least 2.");

      // Initialize matrix input fields
      const matrixFields = document.getElementById("matrix-fields");
      matrixFields.innerHTML = "";
      matrix = Array.from({ length: dimension }, () => Array(dimension).fill(0));

      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          matrixFields.innerHTML += `<input type="number" id="el-${i}-${j}" placeholder="a${i+1}${j+1}" style="width: 60px; margin: 2px;"> `;
        }
        matrixFields.innerHTML += "<br>";
      }

      // Show matrix elements section
      document.getElementById("dimension-section").style.display = "none";
      document.getElementById("matrix-elements-section").style.display = "block";
    }

    // Function to perform LDU factorization
    function performLDU() {
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          matrix[i][j] = parseFloat(document.getElementById(`el-${i}-${j}`).value);
        }
      }

      stepsContainer.innerHTML = ""; // Clear previous steps
      calculateLDU(matrix);
      document.getElementById("matrix-step-section").style.display = "block";
    }

    // Function to display matrices in the steps section
    function displayMatrix(matrix, title) {
      const matrixHTML = `<h3>${title}</h3>` + matrix.map(row => row.map(val => val.toFixed(2)).join(" ")).join("<br>");
      const matrixDiv = document.createElement("div");
      matrixDiv.classList.add("matrix");
      matrixDiv.innerHTML = matrixHTML;
      stepsContainer.appendChild(matrixDiv);
    }

    // Function to calculate LDU factorization
    function calculateLDU(A) {
      let L = Array.from({ length: dimension }, () => Array(dimension).fill(0));
      let D = Array.from({ length: dimension }, () => Array(dimension).fill(0));
      let U = Array.from({ length: dimension }, () => Array(dimension).fill(0));
      let E, stepMatrix;

      for (let i = 0; i < dimension; i++) L[i][i] = 1; // Initialize L as identity matrix

      for (let k = 0; k < dimension; k++) {
        // Extract D[k][k]
        D[k][k] = A[k][k];
        for (let j = k; j < dimension; j++) {
          U[k][j] = A[k][j] / D[k][k]; // Fill U matrix
        }

        for (let i = k + 1; i < dimension; i++) {
          L[i][k] = A[i][k] / D[k][k]; // Fill L matrix
          for (let j = k; j < dimension; j++) {
            A[i][j] = A[i][j] - L[i][k] * A[k][j];
          }
        }

        // Display each elimination matrix step (L matrix update)
        stepMatrix = Array.from({ length: dimension }, (_, row) => Array.from({ length: dimension }, (_, col) => row === col ? 1 : 0));
        for (let i = k + 1; i < dimension; i++) {
          stepMatrix[i][k] = L[i][k];
        }

        displayMatrix(stepMatrix, `Elimination Matrix E${k + 1}`);
        displayMatrix(L, "Updated L Matrix");
      }

      displayMatrix(D, "D Matrix");
      displayMatrix(U, "U Matrix");
    }
