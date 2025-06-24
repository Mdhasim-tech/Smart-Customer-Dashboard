from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Load model and clustered data
model = joblib.load("kmeans_model.pkl")
df = pd.read_csv("dataset.csv")  # This should include 'cluster' column

def get_strategy(avg_income, avg_score):
    if avg_income > 70 and avg_score > 70:
        return "💎 High income, high spenders – Target with premium products and loyalty rewards."
    elif avg_income < 40 and avg_score > 60:
        return "🔥 Low income but high spenders – Attract with trendy offers and reward engagement."
    elif avg_income > 70 and avg_score < 40:
        return "🧠 High income, low spenders – Nudge with personalized recommendations and upsell gently."
    elif avg_income < 40 and avg_score < 40:
        return "💤 Low income, low spending – Minimize cost, consider reactivation campaigns."
    else:
        return "⚡ Balanced group – Use A/B testing to optimize marketing strategy."


@app.route("/clusters", methods=["GET"])
def get_clusters():
    clusters = df["cluster"].unique()
    result = []

    for cluster in sorted(clusters):
        cluster_df = df[df["cluster"] == cluster]
        avg_income = round(cluster_df["Annual Income (k$)"].mean(), 2)
        avg_score = round(cluster_df["Spending Score (1-100)"].mean(), 2)
        strategy = get_strategy(avg_income, avg_score)

        result.append({
            "cluster": int(cluster),
            "count": len(cluster_df),
            "avg_income": avg_income,
            "avg_score": avg_score,
            "strategy": strategy
        })

    return jsonify(result)

@app.route("/customers", methods=["GET"])
def get_customers():
    cluster_id = request.args.get("cluster", type=int)
    if cluster_id is None:
        return jsonify({"error": "Cluster ID is required"}), 400

    customers = df[df["cluster"] == cluster_id][
        ["CustomerID", "Gender", "Age", "Annual Income (k$)", "Spending Score (1-100)"]
    ].to_dict(orient="records")

    return jsonify(customers)

if __name__ == "__main__":
    app.run(debug=True)


