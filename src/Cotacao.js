import React, { useReducer } from 'react';
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

const FlightInput = ({path, sections, handleChange}) => (
  <>
    <input className="block-input" name={path + "CiaAerea"} value={sections[path + "CiaAerea"]} onChange={handleChange} placeholder="Companhia"/>
    <input className="block-input" name={path + "CodSection0"} value={sections[path + "CodSection0"]} onChange={handleChange} placeholder="Código Voo"/>
    <div style={{marginLeft: "4em"}}>
      <Paragraph>Origem/Destino</Paragraph>
      <div>
        <input style={{height: "1.6em"}} name={path + "OrigemSection0"} value={sections[path + "OrigemSection0"]} onChange={handleChange} placeholder="Cdeparturede Origem"/>
        <span> - </span>
        <input style={{height: "1.6em"}} name={path + "DestinoSection0"} value={sections[path + "DestinoSection0"]} onChange={handleChange} placeholder="Cdeparturede Destino"/>
      </div>
      
      <span>Saída:</span>
      <input name={path + "SadepartureSection0"} onChange={handleChange} value={sections[path + "SadepartureSection0"]} placeholder="Horário Saída"></input>
      <span> / Chegada: </span>
      <input name={path + "ChegadaSection0"} onChange={handleChange} value={sections[path + "ChegadaSection0"]} placeholder="Horário Chegada"></input>
    </div>
  </>
);

const Section = ({path, sections, blocks, deleteSection, handleChange}) => (
  <>
    {
      blocks.map(block => (
        <div key={block} className="section">
          <Flex container justifyContent="space-between">
            <input className="block-input" name={path + "departureCiaAerea" + block} value={sections[path + "CiaAerea" + block]} onChange={handleChange} placeholder="Companhia"/>
            <input className="block-input" name={path + "CodSection" + block} value={sections[path + "CodSection" + block]} onChange={handleChange} placeholder="Código Voo"/>
            <Button inputColor="red" inputBorder="2px solid red" onClick={() => deleteSection(block)}>Remover Trajeto</Button>
          </Flex>
          <div style={{marginLeft: "4em"}}>
            <Paragraph>Origem/Destino</Paragraph>
            <div>
              <input style={{height: "1.6em"}} name={path + "OrigemSection" + block} value={sections[path + "OrigemSection" + block]} onChange={handleChange} placeholder="Cdeparturede Origem"/>
              <span> - </span>
              <input style={{height: "1.6em"}} name={path + "DestinoSection" + block} value={sections[path + "DestinoSection" + block]} onChange={handleChange} placeholder="Cdeparturede Destino"/>
            </div>
                   
            <span>Saída:</span>
            <input name={path + "SadepartureSection" + block} value={sections[path + "SadepartureSection" + block]} placeholder="Horário Saída"></input>
            <span> / Chegada: </span>
            <input name={path + "ChegadaSection" + block} value={sections[path + "ChegadaSection" + block]} placeholder="Horário Chegada"></input>
          </div>
        </div>
      ))  
    }
  </>
);

const Cotacao = () => {

  const [sections, setSections] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      departureCiaAerea: '',
      departureCodSection0: '',
      departureOrigemSection0: '',
      departureDestinoSection0: '',
      departureSadepartureSection0: '',
      departureChegadaSection0: '',
      returnCiaAerea: '',
      returnCodSection0: '',
      returnOrigemSection0: '',
      returnDestinoSection0: '',
      returnSadepartureSection0: '',
      returnChegadaSection0: '',
      departure: [],
      return: []

    }
  );

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;

    setSections({[name]: newValue});
  }

  const addPath = (path) => {
      if (sections[path].length === 0) setSections({[path]: path.push(1)})
      else setSections({[path]: path.push(path.length + 1)})
  }

  return (
    <>
      <Flex container flexDirection="column">
        <Layout>
          <div>
            <div className="button-departure">
              <span>departure</span>
              <Button inputColor="green" inputBorder="2px solid green">Adcionar Trajeto</Button>
            </div>
            
            <FlightInput 
              path="departure"
              sections={sections} 
              handleChange={handleChange}
            />
       
            <Section 
              path="departure"
              sections={sections}
              blocks={sections.departure}
              handleChange={handleChange}
            />
          </div>
          
          <div>
            <div className="button-return">
              <span style={{ display: "block" }}>return</span>
              <Button inputColor="green" inputBorder="2px solid green">Adcionar Trajeto</Button>
            </div>

            <FlightInput 
              path="return"
              sections={sections}
              handleChange={handleChange}
            />
            
            <Section 
              path="return"
              sections={sections}
              blocks={sections.return}
              handleChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "40px"}} className="button-image">
            <div>
              <span>VALOR: </span>
              <input style={{height: "1.6em"}} name="valor-passagem" placeholder="Valor da passagem"/>
            </div>
            <Button inputColor="green" inputBorder="2px solid green">Gerar Imagem</Button>
          </div>
        </Layout>
      </Flex>
    </>
  )
}



export default Cotacao;

