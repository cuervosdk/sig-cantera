import React, { Component } from 'react'
import { Table, Checkbox, Button, Icon, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom'



export default class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editRow: -1,
            editRecord: {}
        };


    }

    handleClick = (e, { name }) => this.setState({ activeItem: name })

    // Next few functions are all about building the feature Sdk
    // Read the source and get all the possible properties
    getTableHeaders(sourceName) {
        if (sourceName === '') {
            return [];
        }
        const features = this.props.data;
        const headers = [];
        // Loop over features
        for (let i = 0, ii = features.length; i < ii; i++) {
            // Build a list of unique properties for the header list
            const temp = Object.keys(features[i].properties);
            
            for (let j = 0, jj = temp.length; j < jj; j++) {
                // if the feature.properties is new add it to headers
                if (headers.indexOf(temp[j]) < 0) {
                    headers.push(temp[j]);
                }
            }
        }
        return headers;
    }

    // Build out the headers based on supplied list of properties
    buildTableHeader(properties) {
        const Actions = this.props.actions;
        const th = [];
        if (properties.length === 0) {
            return;
        }
        for (let i = 0, ii = properties.length; i < ii; i++) {
            th.push(<Table.HeaderCell key={properties[i]}>{properties[i]}</Table.HeaderCell>);
        }
        th.push(<Table.HeaderCell key={'acciones'}>Acciones</Table.HeaderCell>)

        return (<Table.Header>
            <Table.Row>
                {th}
            </Table.Row>
        </Table.Header>
        );
    }

    buildTableBody(properties, data) {
        const Actions = this.props.actions;
        const body = [];
        let row = [];
        // Get all the features from the Redux store
        if (!data) {
            return false;
        }
        const features = data;
        // Loop over features
        for (let i = 0, ii = features.length; i < ii; i++) {
            // Loop over properties
            for (let j = 0, jj = properties.length; j < jj; j++) {
                // Build list of properties for each feature
                const featureValue = features[i].properties[properties[j]];
                row.push(
                    <Table.Cell key={i + ',' + j}>
                       {featureValue}
                    </Table.Cell>);
            }
            if (Actions) {
                row.push(
                    <Table.Cell key={i}>
                        <Actions />
                    </Table.Cell>
                )
            } else if (features[i].properties['idcli']) {
                // row.push(
                //     <Link to={`${this.props.match.url}/${features[i].properties['idcli']}`}>Ver Despachos</Link>
                // )
            }else {
                row.push(
                    <Button primary onClick>Zoom</Button>
                )
            }

            body.push(<Table.Row key={i}>{row}</Table.Row>); 
            // Reset the row
            row = [];
        }
        // Return the body
        return (<Table.Body>{body}</Table.Body>);
    }



    render() {

        if (this.props.data.length < 1) {
            return (
                <div>
                    <p>No hay datos para mostrar</p>
                </div>
            )
        } else {
            // Get full list of properties
            const propertyList = this.getTableHeaders(this.props.data);

            // // Build table header
            const tableHeader = this.buildTableHeader(propertyList);
            // // Build table body
            const tableBody = this.buildTableBody(propertyList, this.props.data);


            return (
                <div>
                    <Table celled selectable >
                        {tableHeader}
                        {tableBody}
                    </Table>
                </div>
            );
        }
    }
}
