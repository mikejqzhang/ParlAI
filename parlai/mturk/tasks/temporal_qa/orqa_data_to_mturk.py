import json

def format_question(q):
    q = q[0].upper() + q[1:]
    if q[-1] != '?':
        q = q + '?'
    return q

dataset = 'nq'
split = 'train'
orqa_path = '/Users/michael/Projects/orqa_resplit/NaturalQuestions.resplit.train.jsonl'
output_path = '/Users/michael/Projects/orqa_resplit/mturk_nq.train.jsonl'


with open(orqa_path, 'r') as f:
    data = [json.loads(l) for l in f]

mturk_data = [{"is_onboarding": False,
               "original": ex,
               "dataset": dataset,
               "split": split,
               "idx": str(i),
               "id": '_'.join([dataset, split, str(i)]),
               "messages": [{'id': 'Question', 'text': format_question(ex["question"])}]}
              for i, ex in enumerate(data)]

with open(output_path, 'w') as f:
    for ex in mturk_data:
        f.write(json.dumps(ex) + '\n')
