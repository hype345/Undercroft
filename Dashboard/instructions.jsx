import React from 'react'; // get the React object from the react module

class instrcutions extends React.Component {
  render() {
    return <view> 
        <a href="community"class="button">Return to Community Page</a>
        <h1>Steps to adding data</h1>
        <p>1. click on group on in the far left</p>
        <p>2. click on create new in the top right</p>
        <p>3. then fill out the fields. The first two are delf explanitory and are the name of the group and the description.</p>
        <p>For the GDimageID you wil have to follow these steps. (it is for the picture)</p>
        <p> first add whatever image you want to google drive. Then right click and get shareable link and make sure it is set to anyone with like can view.</p>
        <p>Next in that link select this portion of text and paste it into the GDimageID field</p>
        <img src="imageIDInstructions.png" style={{width: "1000px"}, {height: "200px"}}/>
        </view>;
  }
}

export default instrcutions;