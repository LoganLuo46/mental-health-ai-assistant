# 🧠 Mental Health AI Assistant

A full-stack AI-powered web app that helps mental health counselors generate tone-aware response suggestions for patients. It combines a locally trained ML classifier with GPT-based language generation, and supports semantic search through vector embeddings.

👉 **Live Demo**: https://mentalhealthwebthang.web.app/  
🧪 Try it on any desktop browser — no login required.

---

## 🧩 Key Features

- **Tone Classification**: Predicts therapist dialog tone category (Speaker Initiative, General, or Speaker Responsive) using a custom ML model.
- **GPT-Powered Suggestions**: Uses OpenAI's GPT to generate a response suggestion based on the predicted tone and patient's message.
- **Semantic Search**: Retrieve similar past counseling cases using text embeddings instead of keywords.
- **Modern UI**: Clean web interface deployed via Firebase Hosting.

---

## 🛠️ Tech Stack

| Layer       | Tools & Frameworks                                                                 |
|-------------|-------------------------------------------------------------------------------------|
| Frontend    | **HTML**, **CSS**, **JavaScript**, **Firebase Hosting**                            |
| ML Model    | **Python**, **scikit-learn**, **TF-IDF**, **Logistic Regression**, **joblib**      |
| Backend     | **Flask**, **Docker**, **Render**, **ngrok**, **CORS**, **RESTful API**            |
| Cloud Logic | **Firebase Cloud Functions**, **TypeScript**, **OpenAI GPT API**                   |
| Semantic Search | **OpenAI Embeddings**, **cosine similarity**, vector-based ranking             |

---

## 🧠 How It Works

1. A user inputs a patient message via the web UI.
2. The message is sent to a Flask-based ML API which predicts the dialog tone.
3. The tone + message are passed to GPT through a Firebase Cloud Function.
4. GPT returns a tone-aligned suggestion for how the therapist might respond.
5. Users can also search for past cases using semantic search (via OpenAI embeddings).

---

## 🧪 ML Model Details

- Source: 10 real-world counseling transcripts with 12 dialog act annotations
- Re-grouped into 3 higher-level tone classes for classification
- Preprocessing: removed duplicates, filtered short/empty entries
- Balanced via upsampling, trained using **TF-IDF + Logistic Regression**
- Achieved ~94% **macro F1 score** on validation set

---

## 🔍 Semantic Search

Uses **OpenAI’s `text-embedding-3-small`** to encode patient messages into vectors.

- Stores vector embeddings + metadata in Firestore
- Computes cosine similarity between input vector and stored cases
- Returns top 5 most relevant past counseling exchanges

This helps users find similar emotional patterns or themes, even without exact keyword overlap.

---

## 💻 Running Locally (Optional)

> Only needed if you want to explore how the app is wired together

### 1. Start the ML Model API (Flask)

Make sure you have **Python 3.9+**, and the following packages installed:

```bash
cd ml-backend/
python3 app.py
```
### 2. Tunnel to Public URL with ngrok

```bash
ngrok http 10000
```

Copy the public forwarding URL and update your frontend app.js:

```bash
const mlUrl = "https://your-ngrok-url.ngrok-free.app/predict";
```
### 3. Deploy Firebase Cloud Function

```bash
cd functions/
firebase deploy --only functions:getAdvice
```
This allows your frontend to call OpenAI securely without exposing your API key.


## 📦 Deployment Summary

| **Component**         | **Platform**                    |
|-----------------------|----------------------------------|
| Frontend UI           | Firebase Hosting                |
| ML Model API          | Render (Dockerized Flask)       |
| LLM Integration       | Firebase Cloud Functions        |
| Dev Tunneling (opt)   | ngrok (for local testing)       |

---

## 🧑‍💻 About This Project

This was a solo-built project designed to demonstrate how traditional **ML**, **LLMs**, **cloud functions**, and **full-stack deployment** can come together to solve a real-world problem in **mental health counseling**.

The goal wasn’t just to build a cool demo — it was to create a **functional, reproducible tool** that acts as a proof of concept for tone-aware AI assistance in therapeutic settings.
