import React, {Component} from 'react';
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment
} from 'semantic-ui-react'



export class Footer extends Component {
  render() {
    return (
      <div>
        <Segment
          inverted
          vertical
          style={{
          margin: '5em 0em 0em',
          padding: '5em 0em'
          // backgroundColor:'#3BA2FB'
        }}>
          <Container textAlign='center'>

            <Divider inverted section/>
            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;