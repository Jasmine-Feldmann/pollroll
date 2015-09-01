import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cross_validation import train_test_split
from sklearn import metrics
from sklearn.linear_model import SGDClassifier
from sklearn import linear_model
from sklearn import svm

linear = svm.SVC()

df = pd.read_csv('FINALOBAMA.csv', header=0)

xtrain, xtest, ytrain, ytest = train_test_split(df['Close'], df['Approval'], train_size = 0.8)

linear.fit(pd.DataFrame(xtrain), pd.DataFrame(ytrain))

output = linear.predict(pd.DataFrame(xtest))

ytest = ytest.reset_index()["Approval"]

for i in range (0, len(output)):
    difference = output[i] - ytest[i]
    print difference, output[i], ytest[i]

linear.score(pd.DataFrame(xtrain), pd.DataFrame(ytrain))





