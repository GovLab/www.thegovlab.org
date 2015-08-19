from yaml import load

PROJECTS = load(open('data/projects.yaml'))

def loadData():
    return {
        'projects': PROJECTS
    }

loadData()

dataQuestions = []
crowdQuestions = []
designQuestions = []
for i in PROJECTS:
    y = i['type']
    x = i['related_question']

    if y == 'Data' and x not in dataQuestions:
        dataQuestions.append(x)
    elif y == 'Collective Intelligence' and x not in crowdQuestions:
        crowdQuestions.append(x)
    # elif y == 'Design Thinking' and x not in designQuestions:
    #     designQuestions.append(x)

# questions = dataQuestions + crowdQuestions + designQuestions

print dataQuestions
print
print crowdQuestions
