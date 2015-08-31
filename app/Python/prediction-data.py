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

xtrain, xtest, ytrain, ytest = train_test_split(df['Approval'], df['Close'], train_size = 0.8)

linear.fit(xtrain, ytrain)

output = linear.predict(xtest)





