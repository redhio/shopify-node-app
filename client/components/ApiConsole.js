import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Layout, Stack, Card, TextField, Button, DisplayText } from '@redhio/polaris';
import ObjectInspector from 'react-object-inspector';
import { updatePath, updateParams, sendRequest } from '../actions';

import VerbPicker from './VerbPicker';
import {Line} from 'react-chartjs-2';

class ApiConsole extends Component {
  render() {
    return (
      <Layout sectioned>
        { this.renderForm() }
        { this.renderResponse() }
        { this.renderText() }
        { this.renderChart() }		
      </Layout>
    )
  }
  renderText() {
    return(
      <Layout.Section>
          <DisplayText element="h3" size="small">Good evening, Dominic.</DisplayText>
      </Layout.Section>
    )
  }
  
  renderForm() {
    const { dispatch, requestFields } = this.props;

    return (
      <div>
        <Layout.Section>
          <Stack>
            <VerbPicker verb={requestFields.verb} />
            <TextField
              value={requestFields.path}
              onChange={path => dispatch(updatePath(path))}
            />
            <Button primary onClick={() => dispatch(sendRequest(requestFields))}>
              Send
            </Button>
          </Stack>
        </Layout.Section>

        {this.renderParams()}
      </div>
    )
  }
  renderChart() {
    const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: '#7C0A02',
              borderColor: '#7C0A02',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#7C0A02',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'r#7C0A02',
              pointHoverBorderColor: '#7C0A02',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: 'My Second dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [25, 69, 5, 61, 16, 15, 80]
            }
          ]
        };

    return (
      <div>
      <Layout.Section>
          <DisplayText element="h2" size="small">Line Example</DisplayText>
          <Line data={data} />
      </Layout.Section>
      </div>
    )
  }
  renderParams() {
    const { dispatch, requestFields } = this.props;

    if (requestFields.verb === 'GET') {
      return null;
    } else {
      return (
        <Layout.Section>
          <TextField
            label="Request Params"
            value={requestFields.params}
            onChange={params => dispatch(updateParams(params))}
            multiline={12}
          />
        </Layout.Section>
      );
    }
  }

  renderResponse() {
    const { requestInProgress, requestError, responseBody } = this.props;

    if (responseBody === '') {
      return null;
    }

    if (requestInProgress) {
      return (
        <Layout.Section>
          'requesting...';
        </Layout.Section>
      )
    }

    const data = JSON.parse(responseBody)

    return (
      <Layout.Section>
        <Card>
          <div style={{margin: '15px 15px'}}>
            <ObjectInspector data={data} initialExpandedPaths={['root', 'root.*']}/>
          </div>
        </Card>
      </Layout.Section>
    )
  }
}

function mapStateToProps({
  requestFields,
  requestInProgress,
  requestError,
  responseBody,
}) {
  return {
    requestFields,
    requestInProgress,
    requestError,
    responseBody,
  };
}

export default connect(mapStateToProps)(ApiConsole);
