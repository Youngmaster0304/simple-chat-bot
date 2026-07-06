#!/usr/bin/env python3
"""
Project 2: Data Classification Using AI 📊

This script demonstrates supervised machine learning using the K-Nearest Neighbors (KNN)
classification algorithm on the classic Iris Flower dataset.
Following the IPO (Input-Process-Output) framework, it loads the data, scales features,
splits it into train/test sets, fits a KNN classifier, and outputs validation metrics.
"""

import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score

def run_classification_pipeline():
    print("=" * 70)
    print("📊 Project 2: Supervised Learning Classification Pipeline (KNN) 📊")
    print("=" * 70)

    # 1. INPUT STAGE: Load and Understand the Dataset
    print("\n[INPUT] 1. Loading Iris dataset...")
    iris = load_iris()
    X = iris.data  # Features: Sepal Length, Sepal Width, Petal Length, Petal Width
    y = iris.target  # Labels: 0 (Setosa), 1 (Versicolor), 2 (Virginica)
    feature_names = iris.feature_names
    target_names = iris.target_names

    print(f"  - Dataset size: {X.shape[0]} samples, {X.shape[1]} features")
    print("  - Features:", ", ".join(feature_names))
    print("  - Target classes:", ", ".join(f"{i} ({name})" for i, name in enumerate(target_names)))

    # Display sample data points
    print("\n  - Sample data points (first 3 samples):")
    for i in range(3):
        print(f"    Sample #{i+1}: Features {X[i]} -> Class {y[i]} ({target_names[y[i]]})")

    # 2. PROCESS STAGE: Split, Scale, and Train
    # A. Split data into training (70%) and testing (30%) sets
    print("\n[PROCESS] 2. Splitting dataset into training (70%) and testing (30%) sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.30, random_state=42, stratify=y
    )
    print(f"  - Training samples: {X_train.shape[0]}")
    print(f"  - Testing samples: {X_test.shape[0]}")

    # B. Feature Scaling (Standardization)
    print("\n[PROCESS] 3. Applying Feature Scaling (StandardScaler)...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("  - Features scaled to mean=0 and variance=1")

    # C. Instantiate the KNN model
    k_neighbors = 5
    print(f"\n[PROCESS] 4. Instantiating K-Nearest Neighbors model (n_neighbors={k_neighbors})...")
    model = KNeighborsClassifier(n_neighbors=k_neighbors)

    # D. Fit (Train) the model
    print("[PROCESS] 5. Fitting model on training data...")
    model.fit(X_train_scaled, y_train)

    # E. Predict on test data
    print("[PROCESS] 6. Predicting labels for test data...")
    predictions = model.predict(X_test_scaled)

    # 3. OUTPUT STAGE: Validation Metrics
    print("\n" + "=" * 50)
    print("🏆 OUTPUT STAGE: Model Validation Metrics 🏆")
    print("=" * 50)

    # A. Accuracy Score
    accuracy = accuracy_score(y_test, predictions)
    print(f"\n📈 1. Raw Classification Accuracy: {accuracy:.4f} ({accuracy * 100:.1f}%)")
    print("  *Note: Accuracy represents the percentage of correct predictions out of all test cases.")

    # B. Confusion Matrix
    cm = confusion_matrix(y_test, predictions)
    print("\n🧩 2. Confusion Matrix:")
    print("                  Predicted Class")
    print(f"                  Setosa  Versicolor  Virginica")
    print(f"Actual Setosa      {cm[0][0]:<7}{cm[0][1]:<12}{cm[0][2]}")
    print(f"       Versicolor  {cm[1][0]:<7}{cm[1][1]:<12}{cm[1][2]}")
    print(f"       Virginica   {cm[2][0]:<7}{cm[2][1]:<12}{cm[2][2]}")
    print("\n  - Interpretation:")
    print(f"    - Setosa: {cm[0][0]}/15 classified correctly.")
    print(f"    - Versicolor: {cm[1][1]}/15 classified correctly.")
    print(f"    - Virginica: {cm[2][2]}/15 classified correctly.")

    # C. F1 Score
    # F1 score is harmonic mean of precision & recall. Macro-average handles multi-class.
    f1_macro = f1_score(y_test, predictions, average='macro')
    print(f"\n🎯 3. Macro-Averaged F1 Score: {f1_macro:.4f}")
    print("  *Why this matters: In imbalanced data, accuracy can be a 'mirage'.")
    print("   The F1 Score accounts for false positives and false negatives,")
    print("   evaluating precision and recall to ensure robust classification performance.")
    print("=" * 70)

if __name__ == "__main__":
    run_classification_pipeline()
