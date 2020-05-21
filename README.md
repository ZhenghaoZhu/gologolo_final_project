# Query Data with GraphiQL
### Copy and paste the command below to get all the logos currentyly in the database

    query {
      logos {
        _id,
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        margin,
        height,
        width,
      position,	
        textBoxFontColor,
        textBoxFontSize,
        textBoxList{
          name,
          x,
          y
        },
        textBoxList{
          name,
          text,
          color,
          fontSize,
          background,
          border,
          x,
          y
        },
        imageList {
          name,
          source,
          width,
          height,
          x,
          y
        }
        lastUpdate
      }
    }
#
# Add a logo into the database

### Use this command to add an example logo into the database

    mutation {
      addLogo(
        backgroundColor : "43wresdvt4r",
        borderColor: "43wresdvt4r",
        borderRadius: 50,
        borderWidth: 50,
        border : "solid"
        margin: 9
        height: 800,
        width: 800,
        position : "absolute",
        textBoxFontColor: "43wresdvt4r",
        textBoxFontSize: 50,
        textBoxList: [
          {
            name : "43wresdvt4r",
            text : "test",
            color : "color",
            fontSize : "23",
            x : 10,
            y : 10
          }
        ]
        imageList: [
          {
            name : "image1",
            source : "https://upload.wikimedia.org/wikipedia/commons/4/4d/Bees_Collecting_Pollen_cropped.jpg",
            width : 200,
            height : 200,
            x : 20,
            y : 20
          }
        ]
      
      ) {
        _id
        backgroundColor
        borderColor
        borderRadius
        borderWidth
        margin
        height
        width
        textBoxFontColor
        textBoxFontSize
        lastUpdate
        textBoxList{
          text
          color
          fontSize
          border
          background
          x
          y
        }
        imageList{
          name
          source
          width
          height
          x
          y
        }
      }
    }


### Query the database again and get the _id of the logo you just added

#
# Update a logo in the database
### Now, copy the code below but also remember to replace "[ID HERE]" with the _id you just got from the logo you created.

    mutation {
      updateLogo (
        id : "5ec5ce2c4dabd31cc8d86614",
        backgroundColor : "black",
        borderColor: "black",
        borderRadius: 50,
        borderWidth: 50,
        border : "solid",
        position : "absolute",
        margin: 9
        height: 800,
        width: 800,
        textBoxFontColor: "black",
        textBoxFontSize: 50,
        textBoxList: []
        imageList: []
      
      ) {
        _id
        backgroundColor
        borderColor
        borderRadius
        borderWidth
        margin
        height
        width
        textBoxFontColor
        textBoxFontSize
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
