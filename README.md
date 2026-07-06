# Decode Labs AI Learning Hub 🤖📊

Welcome to the **Decode Labs AI Learning Hub**. This repository contains two educational projects that demonstrate the transition from heuristic, rule-based systems to data-driven supervised machine learning.

---

## 🤖 Project 1: RoboRule (Rule-Based AI Chatbot)

RoboRule is a deterministic chatbot built using control-flow statements. It cleans input strings, checks them against predefined keywords using `if-elif-else` branches, and runs inside a continuous input loop.

### 📁 Structure
*   **`chatbot.py`**: A clean, standalone Python CLI script. Features input normalization (whitespace trimming, case folding, and Byte-Order Mark (BOM) scrubbing).
*   **`index.html`**, **`styles.css`**, **`app.js`**: An interactive browser dashboard that visualizes the decision tree. It highlights the evaluation path in real time when you send a message.

### 🚀 Quick Start (Project 1)
```bash
# Run command-line chatbot
python chatbot.py
```
*   Or open **`index.html`** in a browser to run the visual flow simulator.

---

## 📊 Project 2: RoboClassifier (Supervised Data Classification)

RoboClassifier implements a supervised learning classification pipeline using the **K-Nearest Neighbors (KNN)** algorithm on the classic **Iris Flower dataset**. It showcases the **IPO (Input-Process-Output)** framework.

```
   INPUT STAGE              PROCESS STAGE                 OUTPUT STAGE
  [Iris Dataset]    -->  [Train-Test Split]      -->  [Accuracy Score: 91.1%]
  [Features Scale]  -->  [Standard Standardization] -->  [Confusion Matrix Grid]
                         [KNN Model Fitting]     -->  [Macro F1-Score: 0.909]
```

### 📁 Structure
*   **`classification.py`**: A Python script using `scikit-learn` to execute the ML pipeline: scaling features with `StandardScaler`, splitting train/test (70/30), fitting a KNN model ($k=5$), and printing Accuracy, Confusion Matrix, and macro F1 scores.
*   **`classification.html`**, **`classification_styles.css`**, **`classification_app.js`**: A browser dashboard featuring a interactive scatter plot. Adjust neighbors ($K$) or split ratio to see the decision boundaries reshape. Test custom measurements to see connecting distance vectors point to closest neighbors in real time.

### 🚀 Quick Start (Project 2)
```bash
# Run Python classification pipeline
python classification.py
```
*   Or open **`classification.html`** in a browser to run the visual decision boundary playground.

---

## ⚙️ Heuristics vs Supervised Learning

| Feature | Heuristic Chatbot (Project 1) | KNN Classifier (Project 2) |
| :--- | :--- | :--- |
| **Logic Source** | Rules are coded manually by the developer. | Derived automatically by fitting data clusters. |
| **Control Flow** | Rigid `if-elif-else` conditional checks. | Distance measurements in standardized space. |
| **Input Type** | Strings matching keyword triggers. | Continuous physical measurement vectors. |
| **Output Type** | Hardcoded response string. | Class labels (Setosa, Versicolor, Virginica). |
| **Scaling** | Difficult to maintain as conditions expand. | Scales dynamically as new training points are supplied. |

---

## 🎓 Learning Metrics (Output Validation)
1.  **Classification Accuracy**: The percentage of predictions the model got correct.
2.  **Confusion Matrix**: A table showing correct classifications (on the diagonal) vs misclassification errors (off-diagonal). It highlights *where* mistakes are occurring.
3.  **F1 Score**: The harmonic mean of precision and recall. Essential for identifying an "Accuracy Mirage" where data imbalance hides poor performance.
