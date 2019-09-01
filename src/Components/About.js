import React, { Component } from 'react';
import '../App.css';

class About extends Component {

  constructor() {
    super();
    this.state={};
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="aboutWrapper">
        <h1>Out of the Box Clocks are creations of Ken Wilkinson</h1>
        <p>What started out as a whimsical mental exercise turned into an extended exploration into clocks and clockness. Initially I was interested in the quality expressed by obscured clock hands and how that changed the feel of a clock. But that quickly gave way to a free-for-all of ideas and experiments with new and different ways to look at clocks. What if the hands are separated? What about 12 clocks together, each with a totally different time and only one is right? I liked putting clocks in unusual settings. A clock in a box, clocks in heads, a clock in a book’s hidden compartment, a clock with a pendulum to the side of the clock. I enjoy the way three clocks in a row give you a constantly changing design as well as a little mystery; which is the right time or which do I choose? Similarly, a clock with four minute hands and four hour hands symmetrically placed creates a pleasing flowing pattern as time progresses.</p>
        <p>After making clocks for a while, I became interested in writing fiction about clocks as a way of exploring further my ideas around clocks. This freed me from the constraints of reality. A story evolved involving a boy wandering through a world where clocks and the way people told time were very different from the world he came from. In one community the clocks give the color of the time. So midnight is violet and noon is yellow. In another community time is told by music. He meets a clock maker experimenting with tactile clocks (think slime) and scent based clocks (pine needles, cut grass and flowers). In another community the residents refer to time based on famous stories or walks. 7:35 is “when Edward escapes from the basement” or “crossing the footbridge over Cedar Creek”. In Decatopia they vote on a new time system every year. Last year it was 7 based. And so it went.</p>
        <p>Many of the ideas were totally fantastical. Some could be created but were far beyond my abilities. One idea intrigued me. In the story one clockmaker created graphic clocks that were rendered on a computer screen. I so liked the idea that I created a number of graphic clocks designs. Then my brother, an ace programmer, offered to program some for me and we created an Android phone app with 10 of the graphic clocks. These can be seen on this website and downloaded free from the Google Play store.</p>
        <p>Another idea from the story was that of video clocks. Like Graphic Clocks they are another form of screen-based clock but with much greater possibilities. In 2016 I setup a make shift video clock using a video playlist. The next year my brother wrote a program to run a video clock based on hour long videos. This was followed by me creating a database that runs a video clock based on one-minute granularity. This clock now runs all day long on a shelf in my office.</p>
        <p>I find the idea of screen-based clocks intriguing. It’s a whole world of clocks that, with a few exceptions, hasn’t been explored at all. Poking around in this world has been fascinating. My perspective is constantly evolving as I imagine, create and live with these clocks. Now in 2018 I’m becoming especially interested in making this concept available for others to create and experience. I think a web-based platform is the way to go. We’ll see what I can come up with.</p>
        <p>I am a retired database developer. In the "Art" world I have worked with a variety of media over the years. These include etching, batik, painting, multiple media collage, photography and Photoshop. My approach usually leans to the unconventional. Originally from Ithaca New York, I am an East Coast transplant now with more than 30 years in the Bay Area.</p>
      </div>
    );
  }
}

export default About;