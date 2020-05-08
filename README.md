# Query Data with GraphiQL
### Copy and paste the command below to get all the logos currentyly in the database

    query {
      logos {
        _id,
        text,
        color,
        fontSize,
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        lastUpdate,
        ms
      }
    }
#
# Add a logo into the database

### Use this command to add an example logo into the database

    mutation {
      addLogo(text: "Example Text for Logo", 
        			color: "#FFA500",
      				fontSize: 45,
      				backgroundColor: "#FFFFFF",
      				borderColor: "#ABC4E7",
      				borderRadius: 23,
      				borderWidth: 16,
        			padding: 23,
        			margin: 26
      			) {
        text,
        color,
        fontSize,
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        lastUpdate
      }
    }

### Query the database again and get the _id of the logo you just added

#
# Update a logo in the database
### Now, copy the code below but also remember to replace "[ID HERE]" with the _id you just got from the logo you created.

    mutation {
      updateLogo(
        			id: [ID HERE],
        			text: "Example Text Update Logo", 
        			color: "#FFA500",
      				fontSize: 45,
      				backgroundColor: "#FFFFFF",
      				borderColor: "#ABC4E7",
      				borderRadius: 23,
      				borderWidth: 16,
        			padding: 23,
        			margin: 26
      			) {
        text,
        color,
        fontSize,
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        lastUpdate
      }
    }

### Query the database again and you'll see the corresponding logo has been updated

#
# Delete a logo in the database

### Run the following code to delete a logo based on its id
    mutation {
      removeLogo(id: [ID HERE]) {
        _id
      }
    }
