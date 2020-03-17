import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from './Flex';

const Layout = styled.div`
  margin: 0 auto;
`;

const Paragraph = styled.p`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Button = styled.p`
  color: ${props => props.inputColor || "black"};
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${props => props.inputBorder || "2px solid black"};
  border-radius: 3px;
  cursor: pointer;
`



const FlightInput = ({path}) => (
  <>
    <input className="block-input" name={path + "-cod-section-0"} placeholder="Código Voo"/>
    <div style={{marginLeft: "4em"}}>
      <Paragraph>Origem/Destino</Paragraph>
      <div>
        <input style={{height: "1.6em"}} name={path + "-origem-section-0"} placeholder="Cidade Origem"/>
        <span> - </span>
        <input style={{height: "1.6em"}} name={path + "-destino-section-0"} placeholder="Cidade Destino"/>
      </div>
      
      <span>Saída:</span>
      <input name={path + "-saida-section-0"} placeholder="Horário Saída"></input>
      <span> / Chegada: </span>
      <input name={path + "-chegada-section-0"} placeholder="Horário Chegada"></input>
    </div>
  </>
);

const Section = ({path, sections, deleteSection}) => (
  <>
    {
      sections.map(section => (
        <div key={section} className="section">
          <Flex container justifyContent="space-between">
            <input className="block-input" name={path + "-cod-section-" + section} placeholder="Código Voo"/>
            <Button inputColor="red" inputBorder="2px solid red" onClick={() => deleteSection(section)}>Remover Trajeto</Button>
          </Flex>
          <div style={{marginLeft: "4em"}}>
            <Paragraph>Origem/Destino</Paragraph>
            <div>
              <input style={{height: "1.6em"}} name={path + "-origem-section-" + section} placeholder="Cidade Origem"/>
              <span> - </span>
              <input style={{height: "1.6em"}} name={path + "-destino-section-" + section} placeholder="Cidade Destino"/>
            </div>
                   
            <span>Saída:</span>
            <input name={path + "-saida-section-" + section} placeholder="Horário Saída"></input>
            <span> / Chegada: </span>
            <input name={path + "-chegada-section-" + section} placeholder="Horário Chegada"></input>
          </div>
        </div>
      ))  
    }
  </>
);
/*
const Image = () => {
  return (
    <>
      <Flex container flexDirection="column">
        <Layout>
          <img></img>
          <div>
            <img></img>
            <div className="button-ida">
              <span>IDA</span>
            </div>
            <span>{}</span>

            <input className="block-input" name={path + "-cod-section-0"} placeholder="Código Voo"/>
            <div style={{marginLeft: "4em"}}>
            <Paragraph>Origem/Destino</Paragraph>
            <div>
              <input style={{height: "1.6em"}} name={path + "-origem-section-0"} placeholder="Cidade Origem"/>
              <span> - </span>
              <input style={{height: "1.6em"}} name={path + "-destino-section-0"} placeholder="Cidade Destino"/>
            </div>
      
            <span>Saída:</span>
              <input name={path + "-saida-section-0"} placeholder="Horário Saída"></input>
              <span> / Chegada: </span>
              <input name={path + "-chegada-section-0"} placeholder="Horário Chegada"></input>
            </div>
       
            <Section 
              path="ida"
              sections={departureSections}
              deleteSection={sectionIdx => {
                console.log(`departureSections é ${departureSections}`);
                console.log(`sectionIdx é ${sectionIdx}`);
                

                const newSections = departureSections.filter(section => section !== sectionIdx);
                console.log(newSections);
                setDepartureSection(newSections);
              }}
            />
          

          </div>
          
          <div>
            <img></img>
            <div className="button-volta">
              <span style={{ display: "block" }}>VOLTA</span>
              <Button inputColor="green" inputBorder="2px solid green" onClick={addReturnSection}>Adcionar Trajeto</Button>
            </div>
            <input className="block-input" name="volta-cia-aerea" placeholder="Companhia"/>


            <FlightInput path="volta"/>
            
            <Section 
              path="volta"
              sections={returnSections}
              deleteSection={sectionIdx => {
                console.log(`returnSections é ${returnSections}`);
                console.log(`sectionIdx é ${sectionIdx}`);
                

                const newSections = returnSections.filter(section => section !== sectionIdx);
                console.log(newSections);
                setReturnSection(newSections);
              }}
            />
          </div>
          <div style={{ marginTop: "40px"}} className="button-image">
            <div>
              <span>VALOR: </span>
              <input style={{height: "1.6em"}} name="valor-passagem" placeholder="Valor da passagem"/>
            </div>
            <Button inputColor="green" inputBorder="2px solid green" onClick={generateImage}>Gerar Imagem</Button>
          </div>
          
          <img></img>
        </Layout>
      </Flex>
    </>
  )
}

*/
const Cotacao = () => {

  const [departureSections, setDepartureSection] = useState([]);
  const [returnSections, setReturnSection] = useState([]);

  const addDepartureSection = () => {
    if (departureSections.length === 0) setDepartureSection([1])
    else setDepartureSection([...departureSections, departureSections[departureSections.length - 1] + 1])
  }
  
  const addReturnSection = () => {
    if (returnSections.length === 0) setReturnSection([1])
    else setReturnSection([...returnSections, returnSections[returnSections.length - 1] + 1])
  }

  const generateImage = () => {}

  return (
    <>
      <Flex container flexDirection="column">
        <Layout>
          <img></img>
          <div>
            <img></img>
            <div className="button-ida">
              <span>IDA</span>
              <Button inputColor="green" inputBorder="2px solid green" onClick={addDepartureSection}>Adcionar Trajeto</Button>
            </div>
            <input className="block-input" name="ida-cia-aerea" placeholder="Companhia"/>

            <FlightInput path="ida"/>
       
            <Section 
              path="ida"
              sections={departureSections}
              deleteSection={sectionIdx => {
                console.log(`departureSections é ${departureSections}`);
                console.log(`sectionIdx é ${sectionIdx}`);
                

                const newSections = departureSections.filter(section => section !== sectionIdx);
                console.log(newSections);
                setDepartureSection(newSections);
              }}
            />
          

          </div>
          
          <div>
            <img></img>
            <div className="button-volta">
              <span style={{ display: "block" }}>VOLTA</span>
              <Button inputColor="green" inputBorder="2px solid green" onClick={addReturnSection}>Adcionar Trajeto</Button>
            </div>
            <input className="block-input" name="volta-cia-aerea" placeholder="Companhia"/>


            <FlightInput path="volta"/>
            
            <Section 
              path="volta"
              sections={returnSections}
              deleteSection={sectionIdx => {
                console.log(`returnSections é ${returnSections}`);
                console.log(`sectionIdx é ${sectionIdx}`);
                

                const newSections = returnSections.filter(section => section !== sectionIdx);
                console.log(newSections);
                setReturnSection(newSections);
              }}
            />
          </div>
          <div style={{ marginTop: "40px"}} className="button-image">
            <div>
              <span>VALOR: </span>
              <input style={{height: "1.6em"}} name="valor-passagem" placeholder="Valor da passagem"/>
            </div>
            <Button inputColor="green" inputBorder="2px solid green" onClick={generateImage}>Gerar Imagem</Button>
          </div>
          
          <img></img>
        </Layout>
      </Flex>
    </>
  )
}



export default Cotacao;

