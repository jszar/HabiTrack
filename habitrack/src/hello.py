import mysql.connector
from mysql.connector import errorcode

try:
    #Connect to our database
    cnx = mysql.connector.connect(user='root', password='HabiTracker', host='130.211.227.85', database='habitrackerdb')

    #Initialize a cursor
    cursor = cnx.cursor()

    #Simple query
    query = "SELECT * FROM Users;"
    cursor.execute(query)

    #Print results
    for (col1) in cursor:
        print(col1)

    #Close cursor
    cursor.close()

except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cnx.close()

