/**
 * RoboClassifier - Application Logic Script
 * Embeds Iris dataset, client-side KNN ML model, canvas plotter, and dynamic metrics.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Classic Iris Dataset (150 samples) ---
    // Format: [sepalLength, sepalWidth, petalLength, petalWidth, classIndex]
    // Classes: 0 = setosa, 1 = versicolor, 2 = virginica
    const irisDataset = [
        [5.1, 3.5, 1.4, 0.2, 0], [4.9, 3.0, 1.4, 0.2, 0], [4.7, 3.2, 1.3, 0.2, 0], [4.6, 3.1, 1.5, 0.2, 0], [5.0, 3.6, 1.4, 0.2, 0],
        [5.4, 3.9, 1.7, 0.4, 0], [4.6, 3.4, 1.4, 0.3, 0], [5.0, 3.4, 1.5, 0.2, 0], [4.4, 2.9, 1.4, 0.2, 0], [4.9, 3.1, 1.5, 0.1, 0],
        [5.4, 3.7, 1.5, 0.2, 0], [4.8, 3.4, 1.6, 0.2, 0], [4.8, 3.0, 1.4, 0.1, 0], [4.3, 3.0, 1.1, 0.1, 0], [5.8, 4.0, 1.2, 0.2, 0],
        [5.7, 4.4, 1.5, 0.4, 0], [5.4, 3.9, 1.3, 0.4, 0], [5.1, 3.5, 1.4, 0.3, 0], [5.7, 3.8, 1.7, 0.3, 0], [5.1, 3.8, 1.5, 0.3, 0],
        [5.4, 3.4, 1.7, 0.2, 0], [5.1, 3.7, 1.5, 0.4, 0], [4.6, 3.6, 1.0, 0.2, 0], [5.1, 3.3, 1.7, 0.5, 0], [4.8, 3.4, 1.9, 0.2, 0],
        [5.0, 3.0, 1.6, 0.2, 0], [5.0, 3.4, 1.6, 0.4, 0], [5.2, 3.5, 1.5, 0.2, 0], [5.2, 3.4, 1.4, 0.2, 0], [4.7, 3.2, 1.6, 0.2, 0],
        [4.8, 3.1, 1.6, 0.2, 0], [5.4, 3.4, 1.5, 0.4, 0], [5.2, 4.1, 1.5, 0.1, 0], [5.5, 4.2, 1.4, 0.2, 0], [4.9, 3.1, 1.5, 0.2, 0],
        [5.0, 3.2, 1.2, 0.2, 0], [5.5, 3.5, 1.3, 0.2, 0], [4.9, 3.6, 1.4, 0.1, 0], [4.4, 3.0, 1.3, 0.2, 0], [5.1, 3.4, 1.5, 0.2, 0],
        [5.0, 3.5, 1.3, 0.3, 0], [4.5, 2.3, 1.3, 0.3, 0], [4.4, 3.2, 1.3, 0.2, 0], [5.0, 3.5, 1.6, 0.6, 0], [5.1, 3.8, 1.9, 0.4, 0],
        [4.8, 3.0, 1.4, 0.3, 0], [5.1, 3.8, 1.6, 0.2, 0], [4.6, 3.2, 1.4, 0.2, 0], [5.3, 3.7, 1.5, 0.2, 0], [5.0, 3.3, 1.4, 0.2, 0],
        [7.0, 3.2, 4.7, 1.4, 1], [6.4, 3.2, 4.5, 1.5, 1], [6.9, 3.1, 4.9, 1.5, 1], [5.5, 2.3, 4.0, 1.3, 1], [6.5, 2.8, 4.6, 1.5, 1],
        [5.7, 2.8, 4.5, 1.3, 1], [6.3, 3.3, 4.7, 1.6, 1], [4.9, 2.4, 3.3, 1.0, 1], [6.6, 2.9, 4.6, 1.3, 1], [5.2, 2.7, 3.9, 1.4, 1],
        [5.0, 2.0, 3.5, 1.0, 1], [5.9, 3.0, 4.2, 1.5, 1], [6.0, 2.2, 4.0, 1.0, 1], [6.1, 2.9, 4.7, 1.4, 1], [5.6, 2.9, 3.6, 1.3, 1],
        [6.7, 3.1, 4.4, 1.4, 1], [5.6, 3.0, 4.5, 1.5, 1], [5.8, 2.7, 4.1, 1.0, 1], [6.2, 2.2, 4.5, 1.5, 1], [5.6, 2.5, 3.9, 1.1, 1],
        [5.9, 3.2, 4.8, 1.8, 1], [6.1, 2.8, 4.0, 1.3, 1], [6.3, 2.5, 4.9, 1.5, 1], [6.1, 2.8, 4.7, 1.2, 1], [6.4, 2.9, 4.3, 1.3, 1],
        [6.6, 3.0, 4.4, 1.4, 1], [6.8, 2.8, 4.8, 1.4, 1], [6.7, 3.0, 5.0, 1.7, 1], [6.0, 2.9, 4.5, 1.5, 1], [5.7, 2.6, 3.5, 1.0, 1],
        [5.5, 2.4, 3.8, 1.1, 1], [5.5, 2.4, 3.7, 1.0, 1], [5.8, 2.7, 3.9, 1.2, 1], [6.0, 2.7, 5.1, 1.6, 1], [5.4, 3.0, 4.5, 1.5, 1],
        [6.0, 3.4, 4.5, 1.6, 1], [6.7, 3.1, 4.7, 1.5, 1], [6.3, 2.3, 4.4, 1.3, 1], [5.6, 3.0, 4.1, 1.3, 1], [5.5, 2.5, 4.0, 1.3, 1],
        [5.5, 2.6, 4.4, 1.2, 1], [6.1, 3.0, 4.6, 1.4, 1], [5.8, 2.6, 4.0, 1.2, 1], [5.0, 2.3, 3.3, 1.0, 1], [5.6, 2.7, 4.2, 1.3, 1],
        [5.7, 3.0, 4.2, 1.2, 1], [5.7, 2.9, 4.2, 1.3, 1], [6.2, 2.9, 4.3, 1.3, 1], [5.1, 2.5, 3.0, 1.1, 1], [5.7, 2.8, 4.1, 1.3, 1],
        [6.3, 3.3, 6.0, 2.5, 2], [5.8, 2.7, 5.1, 1.9, 2], [7.1, 3.0, 5.9, 2.1, 2], [6.3, 2.9, 5.6, 1.8, 2], [6.5, 3.0, 5.8, 2.2, 2],
        [7.6, 3.0, 6.6, 2.1, 2], [4.9, 2.5, 4.5, 1.7, 2], [7.3, 2.9, 6.3, 1.8, 2], [6.7, 2.5, 5.8, 1.8, 2], [7.2, 3.6, 6.1, 2.5, 2],
        [6.5, 3.2, 5.1, 2.0, 2], [6.4, 2.7, 5.3, 1.9, 2], [6.8, 3.0, 5.5, 2.1, 2], [5.7, 2.5, 5.0, 2.0, 2], [5.8, 2.8, 5.1, 2.4, 2],
        [6.4, 3.2, 5.3, 2.3, 2], [6.5, 3.0, 5.5, 1.8, 2], [7.7, 3.8, 6.7, 2.2, 2], [7.7, 2.6, 6.9, 2.3, 2], [6.0, 2.2, 5.0, 1.5, 2],
        [6.9, 3.2, 5.7, 2.3, 2], [5.6, 2.8, 4.9, 2.0, 2], [7.7, 2.8, 6.7, 2.0, 2], [6.3, 2.7, 4.9, 1.8, 2], [6.7, 3.3, 5.7, 2.1, 2],
        [7.2, 3.2, 6.0, 1.8, 2], [6.2, 2.8, 4.8, 1.8, 2], [6.1, 3.0, 4.9, 1.8, 2], [6.4, 2.8, 5.6, 2.1, 2], [7.2, 3.0, 5.8, 1.6, 2],
        [7.4, 2.8, 6.1, 1.9, 2], [7.9, 3.8, 6.4, 2.0, 2], [6.4, 2.8, 5.6, 2.2, 2], [6.3, 2.8, 5.1, 1.5, 2], [6.1, 2.6, 5.6, 1.4, 2],
        [7.7, 3.0, 6.1, 2.3, 2], [6.3, 3.4, 5.6, 2.4, 2], [6.4, 3.1, 5.5, 1.8, 2], [6.0, 3.0, 4.8, 1.8, 2], [6.9, 3.1, 5.4, 2.1, 2],
        [6.7, 3.1, 5.6, 2.4, 2], [6.9, 3.1, 5.1, 2.3, 2], [5.8, 2.7, 5.1, 1.9, 2], [6.8, 3.2, 5.9, 2.3, 2], [6.7, 3.3, 5.7, 2.5, 2],
        [6.7, 3.0, 5.2, 2.3, 2], [6.3, 2.5, 5.0, 1.9, 2], [6.5, 3.0, 5.2, 2.0, 2], [6.2, 3.4, 5.4, 2.3, 2], [5.9, 3.0, 5.1, 1.8, 2]
    ];

    const targetNames = ['Setosa', 'Versicolor', 'Virginica'];
    const featureNames = ['Sepal Length (cm)', 'Sepal Width (cm)', 'Petal Length (cm)', 'Petal Width (cm)'];

    // --- State Variables ---
    let splitRatio = 0.70;
    let kNeighbors = 5;
    let xAxisFeature = 2; // Default Petal Length
    let yAxisFeature = 3; // Default Petal Width

    // Splitted and scaled data
    let trainData = []; // Array of { features: [], label: int }
    let testData = [];  // Array of { features: [], label: int }
    let scaler = { mean: [], std: [] }; // Mean & Std Dev of training set for standardization

    // UI elements
    const splitSlider = document.getElementById('split-slider');
    const splitVal = document.getElementById('split-val');
    const kSlider = document.getElementById('k-slider');
    const kVal = document.getElementById('k-val');
    const xAxisSelect = document.getElementById('x-axis-select');
    const yAxisSelect = document.getElementById('y-axis-select');
    const trainBtn = document.getElementById('train-btn');
    
    const accuracyScoreVal = document.getElementById('accuracy-score-val');
    const f1ScoreVal = document.getElementById('f1-score-val');
    const canvasLoading = document.getElementById('canvas-loading');
    
    // Sliders for prediction
    const sepalLenSlider = document.getElementById('sepal-len-slider');
    const sepalLenVal = document.getElementById('sepal-len-val');
    const sepalWidSlider = document.getElementById('sepal-wid-slider');
    const sepalWidVal = document.getElementById('sepal-wid-val');
    const petalLenSlider = document.getElementById('petal-len-slider');
    const petalLenVal = document.getElementById('petal-len-val');
    const petalWidSlider = document.getElementById('petal-wid-slider');
    const petalWidVal = document.getElementById('petal-wid-val');
    
    // Prediction Outputs
    const predictedClassBadge = document.getElementById('predicted-class-badge');
    const votesList = document.getElementById('votes-list');
    
    // Plotting Canvas
    const canvas = document.getElementById('scatter-canvas');
    const ctx = canvas.getContext('2d');

    // Code & tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const pythonCodeContent = document.getElementById('python-code-content');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    // --- Tab Switch Setup ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // --- Pseudo-Random Generator (Seedable) ---
    // Standard LCG generator for deterministic train/test splits (mimicking random_state=42)
    function seedRandom(seed) {
        let currentSeed = seed;
        return function() {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
        };
    }

    // --- Data Split & Standard Scaling ---
    function splitAndScaleData() {
        const rand = seedRandom(42); // Seed to guarantee identical results on split updates
        
        trainData = [];
        testData = [];

        // Shuffle index list deterministically
        const indices = [...Array(150).keys()];
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Stratified Splitting to make sure classes are distributed evenly
        const classes = { 0: [], 1: [], 2: [] };
        indices.forEach(idx => {
            const label = irisDataset[idx][4];
            classes[label].push(idx);
        });

        // Split per class
        Object.keys(classes).forEach(label => {
            const classIndices = classes[label];
            const trainCount = Math.floor(classIndices.length * splitRatio);
            
            for (let i = 0; i < classIndices.length; i++) {
                const datasetIndex = classIndices[i];
                const sample = {
                    features: irisDataset[datasetIndex].slice(0, 4),
                    label: parseInt(label)
                };
                
                if (i < trainCount) {
                    trainData.push(sample);
                } else {
                    testData.push(sample);
                }
            }
        });

        // Compute Mean and Standard Deviation of training set for scaling (4 features)
        scaler.mean = [0, 0, 0, 0];
        scaler.std = [0, 0, 0, 0];
        const N = trainData.length;

        for (let f = 0; f < 4; f++) {
            let sum = 0;
            trainData.forEach(item => sum += item.features[f]);
            scaler.mean[f] = sum / N;

            let varSum = 0;
            trainData.forEach(item => varSum += Math.pow(item.features[f] - scaler.mean[f], 2));
            scaler.std[f] = Math.sqrt(varSum / N);
            if (scaler.std[f] === 0) scaler.std[f] = 1; // Prevent division by zero
        }

        // Apply scale to features in trainData & testData
        trainData.forEach(item => {
            item.scaledFeatures = item.features.map((val, idx) => (val - scaler.mean[idx]) / scaler.std[idx]);
        });
        testData.forEach(item => {
            item.scaledFeatures = item.features.map((val, idx) => (val - scaler.mean[idx]) / scaler.std[idx]);
        });
    }

    // --- K-Nearest Neighbors Classifier Implementation ---
    // Computes Euclidean distance in 4D standardized space
    function computeDistance(feat1, feat2) {
        let sum = 0;
        for (let i = 0; i < 4; i++) {
            sum += Math.pow(feat1[i] - feat2[i], 2);
        }
        return Math.sqrt(sum);
    }

    // Runs KNN classification
    // Returns prediction: { label: int, votes: [countSetosa, countVersi, countVirgin], neighbors: Array }
    function runKNN(testScaledFeatures, k) {
        // Compute distance to all training samples
        const distances = trainData.map((trainItem, index) => {
            return {
                dist: computeDistance(testScaledFeatures, trainItem.scaledFeatures),
                label: trainItem.label,
                features: trainItem.features,
                scaledFeatures: trainItem.scaledFeatures,
                index: index
            };
        });

        // Sort by distance ascending
        distances.sort((a, b) => a.dist - b.dist);

        // Select K nearest
        const neighbors = distances.slice(0, k);

        // Vote counting
        const votes = [0, 0, 0];
        neighbors.forEach(n => {
            votes[n.label]++;
        });

        // Determine majority class
        let maxVotes = -1;
        let predictedLabel = -1;
        for (let c = 0; c < 3; c++) {
            if (votes[c] > maxVotes) {
                maxVotes = votes[c];
                predictedLabel = c;
            }
        }

        return {
            label: predictedLabel,
            votes: votes,
            neighbors: neighbors
        };
    }

    // --- Metrics Evaluator ---
    function evaluateModel() {
        let correctCount = 0;
        const confusionMatrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        // Predict on all testing data
        testData.forEach(item => {
            const result = runKNN(item.scaledFeatures, kNeighbors);
            confusionMatrix[item.label][result.label]++;
            if (result.label === item.label) {
                correctCount++;
            }
        });

        // Calculate Accuracy
        const accuracy = (correctCount / testData.length) * 100;
        accuracyScoreVal.textContent = `${accuracy.toFixed(2)}%`;

        // Calculate Macro F1 Score
        // F1 = 2 * (Precision * Recall) / (Precision + Recall)
        let f1Sum = 0;
        for (let c = 0; c < 3; c++) {
            // True Positives (c, c)
            const TP = confusionMatrix[c][c];
            
            // False Positives (Sum of column c excluding TP)
            let FP = 0;
            for (let r = 0; r < 3; r++) {
                if (r !== c) FP += confusionMatrix[r][c];
            }
            
            // False Negatives (Sum of row c excluding TP)
            let FN = 0;
            for (let col = 0; col < 3; col++) {
                if (col !== c) FN += confusionMatrix[c][col];
            }

            const precision = TP + FP > 0 ? TP / (TP + FP) : 0;
            const recall = TP + FN > 0 ? TP / (TP + FN) : 0;
            const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
            
            f1Sum += f1;
        }

        const macroF1 = f1Sum / 3;
        f1ScoreVal.textContent = macroF1.toFixed(4);

        // Update Confusion Matrix Grid UI
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const cell = document.getElementById(`cm-${r}-${c}`);
                const val = confusionMatrix[r][c];
                cell.textContent = val;
                
                // Highlight errors red
                if (r !== c) {
                    if (val > 0) {
                        cell.classList.add('has-error');
                    } else {
                        cell.classList.remove('has-error');
                    }
                }
            }
        }
    }

    // --- Interactive Canvas Plotter ---
    // Plots dataset points and renders background decision zones
    function drawPlot() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pad = 50; // padding around plot inside canvas
        const w = canvas.width - pad * 2;
        const h = canvas.height - pad * 2;

        // Features limits in dataset to dynamically scale coordinates
        const mins = [4.3, 2.0, 1.0, 0.1];
        const maxs = [7.9, 4.4, 6.9, 2.5];

        const xMin = mins[xAxisFeature];
        const xMax = maxs[xAxisFeature];
        const yMin = mins[yAxisFeature];
        const yMax = maxs[yAxisFeature];

        // Coordinate converter functions
        function toScreenX(val) {
            return pad + ((val - xMin) / (xMax - xMin)) * w;
        }
        function toScreenY(val) {
            return pad + h - ((val - yMin) / (yMax - yMin)) * h;
        }
        function toFeatureX(screenX) {
            return xMin + ((screenX - pad) / w) * (xMax - xMin);
        }
        function toFeatureY(screenY) {
            return yMin + ((pad + h - screenY) / h) * (yMax - yMin);
        }

        // Colors configurations
        const classColors = [
            '#fb7185', // Setosa (rose-400)
            '#34d399', // Versicolor (emerald-400)
            '#a78bfa'  // Virginica (violet-400)
        ];

        // 1. Draw Decision Boundaries Background
        const gridResX = 80;
        const gridResY = 60;
        const cellW = w / gridResX;
        const cellH = h / gridResY;

        // Current inputs from user sliders (sepalLength, sepalWidth, petalLength, petalWidth)
        const currentInputs = [
            parseFloat(sepalLenSlider.value),
            parseFloat(sepalWidSlider.value),
            parseFloat(petalLenSlider.value),
            parseFloat(petalWidSlider.value)
        ];

        // Loop grid and classify each point
        for (let gx = 0; gx < gridResX; gx++) {
            for (let gy = 0; gy < gridResY; gy++) {
                const sx = pad + gx * cellW;
                const sy = pad + gy * cellH;

                // Feature coordinates corresponding to this pixel
                const fx = toFeatureX(sx + cellW / 2);
                const fy = toFeatureY(sy + cellH / 2);

                // Construct full 4D feature vector
                // Non-axes features are filled from user's current playground slider inputs
                const features4D = [...currentInputs];
                features4D[xAxisFeature] = fx;
                features4D[yAxisFeature] = fy;

                // Standardize
                const scaled4D = features4D.map((val, idx) => (val - scaler.mean[idx]) / scaler.std[idx]);

                // Run KNN
                const pred = runKNN(scaled4D, kNeighbors);

                // Fill background cell
                if (pred.label === 0) ctx.fillStyle = 'rgba(251, 113, 133, 0.05)';
                else if (pred.label === 1) ctx.fillStyle = 'rgba(52, 211, 153, 0.05)';
                else ctx.fillStyle = 'rgba(167, 139, 250, 0.05)';

                ctx.fillRect(sx, sy, cellW + 0.5, cellH + 0.5);
            }
        }

        // 2. Draw Plot Grid Axes & Labels
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.fillStyle = '#64748b';
        ctx.font = '500 10px Outfit';
        ctx.textAlign = 'center';

        // Draw horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const yVal = yMin + (i / 5) * (yMax - yMin);
            const sy = toScreenY(yVal);
            ctx.beginPath();
            ctx.moveTo(pad, sy);
            ctx.lineTo(pad + w, sy);
            ctx.stroke();
            
            // Label
            ctx.textAlign = 'right';
            ctx.fillText(yVal.toFixed(1), pad - 10, sy + 3);
        }

        // Draw vertical grid lines
        for (let i = 0; i <= 5; i++) {
            const xVal = xMin + (i / 5) * (xMax - xMin);
            const sx = toScreenX(xVal);
            ctx.beginPath();
            ctx.moveTo(sx, pad);
            ctx.lineTo(sx, pad + h);
            ctx.stroke();
            
            // Label
            ctx.textAlign = 'center';
            ctx.fillText(xVal.toFixed(1), sx, pad + h + 15);
        }

        // Axes titles
        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 11px Outfit';
        
        // X Title
        ctx.textAlign = 'center';
        ctx.fillText(featureNames[xAxisFeature], pad + w / 2, pad + h + 32);
        
        // Y Title
        ctx.save();
        ctx.translate(pad - 32, pad + h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(featureNames[yAxisFeature], 0, 0);
        ctx.restore();

        // 3. Plot Dataset Points
        // Training data
        trainData.forEach(item => {
            const sx = toScreenX(item.features[xAxisFeature]);
            const sy = toScreenY(item.features[yAxisFeature]);
            
            ctx.beginPath();
            ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = classColors[item.label];
            ctx.fill();
            ctx.strokeStyle = '#0b0f19';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Testing data (Outline circles to distinguish)
        testData.forEach(item => {
            const sx = toScreenX(item.features[xAxisFeature]);
            const sy = toScreenY(item.features[yAxisFeature]);
            
            ctx.beginPath();
            ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.fill();
            ctx.strokeStyle = classColors[item.label];
            ctx.lineWidth = 1.8;
            ctx.stroke();
        });

        // 4. Draw Custom Testing Point & Nearest Neighbors
        const customScaled = currentInputs.map((val, idx) => (val - scaler.mean[idx]) / scaler.std[idx]);
        const knnResult = runKNN(customScaled, kNeighbors);

        const customX = toScreenX(currentInputs[xAxisFeature]);
        const customY = toScreenY(currentInputs[yAxisFeature]);

        // Draw connection lines to nearest neighbors
        knnResult.neighbors.forEach(neighbor => {
            const nsx = toScreenX(neighbor.features[xAxisFeature]);
            const nsy = toScreenY(neighbor.features[yAxisFeature]);

            // Draw line
            ctx.beginPath();
            ctx.moveTo(customX, customY);
            ctx.lineTo(nsx, nsy);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash

            // Highlight neighbor circles
            ctx.beginPath();
            ctx.arc(nsx, nsy, 7.5, 0, Math.PI * 2);
            ctx.strokeStyle = '#f59e0b'; // Amber outline for neighbors
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // Draw custom test point crosshair
        ctx.beginPath();
        ctx.arc(customX, customY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Crosshair internal dot
        ctx.beginPath();
        ctx.arc(customX, customY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0b0f19';
        ctx.fill();

        // Update predictions details on dashboard
        updatePredictionUI(knnResult);
    }

    // --- Update Prediction UI panel ---
    function updatePredictionUI(knnResult) {
        const predictedLabel = knnResult.label;
        predictedClassBadge.textContent = targetNames[predictedLabel];
        
        // Remove old classes
        predictedClassBadge.className = 'result-class-badge';
        if (predictedLabel === 0) predictedClassBadge.classList.add('setosa-match');
        else if (predictedLabel === 1) predictedClassBadge.classList.add('versicolor-match');
        else predictedClassBadge.classList.add('virginica-match');

        // Render neighbor vote list bars
        votesList.innerHTML = '';
        const classGlow = ['setosa', 'versicolor', 'virginica'];
        
        for (let c = 0; c < 3; c++) {
            const count = knnResult.votes[c];
            const pct = (count / kNeighbors) * 100;
            
            const voteItem = document.createElement('div');
            voteItem.className = 'vote-bar-item';
            voteItem.innerHTML = `
                <div class="vote-label">${targetNames[c]}</div>
                <div class="vote-bar-bg">
                    <div class="vote-bar-fill ${classGlow[c]}" style="width: ${pct}%"></div>
                </div>
                <div class="vote-count">${count} / ${kNeighbors}</div>
            `;
            votesList.appendChild(voteItem);
        }
    }

    // --- Dynamic Scikit-Learn Python Code display ---
    function generatePythonCode() {
        const testFraction = (1.0 - splitRatio).toFixed(2);
        const code = `#!/usr/bin/env python3
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score

# 1. Load the Iris dataset
iris = load_iris()
X = iris.data  # 150 samples with 4 features
y = iris.target  # Labels: 0 (Setosa), 1 (Versicolor), 2 (Virginica)

# 2. Train-Test Split (using ${Math.round(splitRatio * 100)}% training data)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=${testFraction}, random_state=42, stratify=y
)

# 3. Apply Feature Scaling (Standard Standardization)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. Instantiate the Model (k = ${kNeighbors})
model = KNeighborsClassifier(n_neighbors=${kNeighbors})

# 5. Fit the Model (Memorize the map)
model.fit(X_train_scaled, y_train)

# 6. Predict on the test data (Apply logic)
predictions = model.predict(X_test_scaled)

# 7. Validate Outputs
accuracy = accuracy_score(y_test, predictions)
cm = confusion_matrix(y_test, predictions)
f1_macro = f1_score(y_test, predictions, average='macro')

print(f"Accuracy: {accuracy * 100:.2f}%")
print("Confusion Matrix:\\n", cm)
print(f"Macro F1 Score: {f1_macro:.4f}")
`;
        pythonCodeContent.textContent = code;
    }

    // --- Clipboard Utility ---
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pythonCodeContent.textContent)
            .then(() => {
                const icon = copyCodeBtn.querySelector('i');
                icon.className = 'fa-solid fa-check text-green';
                setTimeout(() => {
                    icon.className = 'fa-regular fa-copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    // --- Hyperparameter Event Listeners ---
    splitSlider.addEventListener('input', (e) => {
        const trPct = parseInt(e.target.value);
        const tePct = 100 - trPct;
        splitVal.textContent = `${trPct}% / ${tePct}%`;
        splitRatio = trPct / 100;
    });

    kSlider.addEventListener('input', (e) => {
        kNeighbors = parseInt(e.target.value);
        kVal.textContent = kNeighbors;
    });

    xAxisSelect.addEventListener('change', (e) => {
        xAxisFeature = parseInt(e.target.value);
        drawPlot();
    });

    yAxisSelect.addEventListener('change', (e) => {
        yAxisFeature = parseInt(e.target.value);
        drawPlot();
    });

    // Train button action with loading visual
    trainBtn.addEventListener('click', async () => {
        canvasLoading.style.display = 'flex';
        await new Promise(r => setTimeout(r, 600)); // Short artificial delay for ML fit representation
        
        splitAndScaleData();
        evaluateModel();
        drawPlot();
        generatePythonCode();
        
        canvasLoading.style.display = 'none';
    });

    // --- Prediction Playground Sliders ---
    sepalLenSlider.addEventListener('input', (e) => {
        sepalLenVal.textContent = parseFloat(e.target.value).toFixed(1);
        drawPlot();
    });

    sepalWidSlider.addEventListener('input', (e) => {
        sepalWidVal.textContent = parseFloat(e.target.value).toFixed(1);
        drawPlot();
    });

    petalLenSlider.addEventListener('input', (e) => {
        petalLenVal.textContent = parseFloat(e.target.value).toFixed(1);
        drawPlot();
    });

    petalWidSlider.addEventListener('input', (e) => {
        petalWidVal.textContent = parseFloat(e.target.value).toFixed(1);
        drawPlot();
    });

    // --- App Initialization ---
    splitAndScaleData();
    evaluateModel();
    drawPlot();
    generatePythonCode();
});
