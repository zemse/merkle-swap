import React, { useState, useEffect } from 'react';
import { getProposalFromKami } from '../../../plasma-utils/proposal';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';

export function Step1(props: {
  setCurrentStep: (currentStep: number) => any;
  setBunchDepth: (bunchDepth: number) => any;
  plasmaState: { lastEsnBlockOnEth: number; latestEsnBlock: number };
}) {
  const [bunchProposal, setBunchProposal] = useState<any>(null);

  useEffect(() => {
    // getProposalFromKami();
  }, []);

  const maxBunchDepth = Math.floor(
    Math.log2(props.plasmaState.latestEsnBlock - props.plasmaState.lastEsnBlockOnEth)
  );

  return (
    <div className="exchange-box-wht-modal">
      <div className="exchange-container mt20 mb20">
        <h3 className="main-prf">STEP 1: Select Bunch Depth</h3>
        {[...Array(maxBunchDepth).keys()]
          .map((n) => n + 1)
          .map((bunchDepth) => (
            <Card>
              <Card.Body>
                <Container fluid="md">
                  <Row>
                    <Col xs={9}>
                      Start Block: {props.plasmaState.lastEsnBlockOnEth + 1}
                      <br />
                      BunchDepth: {bunchDepth}
                      <br />
                      End block: {props.plasmaState.lastEsnBlockOnEth + 2 ** bunchDepth}
                    </Col>
                    <Col xs={3}>
                      <button
                        onClick={() => {
                          props.setBunchDepth(bunchDepth);
                          props.setCurrentStep(2);
                        }}
                        className="tr-pn-btn p-1 px-4"
                      >
                        Select
                      </button>
                    </Col>
                  </Row>
                  {bunchDepth >= 15 ? (
                    <Alert variant="warning">
                      This bunch depth is inefficient. Multiple bunches with lower bunche depths are
                      recommended to be posted.
                    </Alert>
                  ) : null}
                </Container>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}
