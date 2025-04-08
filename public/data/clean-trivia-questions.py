import json
import html

# Load your JSON file
with open('/Users/lisaquinley/Dropbox/Parsons_MS_Data-Visualization/Spring-2025/PSAM-5550_Collab-p5Party/GameB-ShopKeepers/public/data/animal_questions.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Track seen questions
seen_questions = set()
unique_results = []

# Filter out duplicates and decode HTML entities
for item in data["results"]:
    # Decode HTML entities in question and answers
    item["question"] = html.unescape(item["question"])
    item["correct_answer"] = html.unescape(item["correct_answer"])
    item["incorrect_answers"] = [html.unescape(ans) for ans in item["incorrect_answers"]]

    # Check for duplicate questions
    question_text = item["question"]
    if question_text not in seen_questions:
        seen_questions.add(question_text)
        unique_results.append(item)

# Update the results with cleaned and unique entries
data["results"] = unique_results

# Write the cleaned data to a new file
with open('cleaned_file_animal_questions.json', 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=4, ensure_ascii=False)

print(f"Cleaned and removed duplicates. {len(unique_results)} unique questions remain.")
