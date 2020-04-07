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

const FlightInput = ({path, sections, handleChange, addPath}) => (
  <>
    <div className="button-departure">
      <span>{(path === "departure" ? "IDA" : "VOLTA")}</span>
      <Button inputColor="green" inputBorder="2px solid green" onClick={() => addPath(path)}>Adcionar Trajeto</Button>
    </div>
    <input className="block-input" name={path + "CiaAerea"} value={sections[path + "CiaAerea"] || ''} onChange={handleChange} placeholder="Companhia"/>
    <input className="block-input" name={path + "CodSection0"} value={sections[path + "CodSection0"] || ''} onChange={handleChange} placeholder="Código Voo"/>
    <div style={{marginLeft: "4em"}}>
      <Paragraph>Origem/Destino</Paragraph>
      <div>
        <input style={{height: "1.6em"}} name={path + "OrigemSection0"} value={sections[path + "OrigemSection0"] || ''} onChange={handleChange} placeholder="Cidade Origem"/>
        <span> - </span>
        <input style={{height: "1.6em"}} name={path + "DestinoSection0"} value={sections[path + "DestinoSection0"] || ''} onChange={handleChange} placeholder="Cidade Destino"/>
      </div>
      
      <span>Saída: </span>
      <input name={path + "SaidaSection0"} onChange={handleChange} value={sections[path + "SaidaSection0"] || ''} placeholder="Horário Saída"></input>
      <span> / Chegada: </span>
      <input name={path + "ChegadaSection0"} onChange={handleChange} value={sections[path + "ChegadaSection0"] || ''} placeholder="Horário Chegada"></input>
    </div>
  </>
);

const Section = ({path, sections, blocks, deleteSection, handleChange}) => (
  <>
    {
      blocks.map(block => (
        <div key={block} className="section">
          <Flex container justifyContent="space-between">
            <div>
              <input className="block-input" name={path + "CiaAerea" + block} value={sections[path + "CiaAerea" + block] || ''} onChange={handleChange} placeholder="Companhia"/>
              <input className="block-input" name={path + "CodSection" + block} value={sections[path + "CodSection" + block] || ''} onChange={handleChange} placeholder="Código Voo"/>
            </div>
            <Button inputColor="red" inputBorder="2px solid red" onClick={() => deleteSection(path, block)}>Remover Trajeto</Button>
          </Flex>
          <div style={{marginLeft: "4em"}}>
            <Paragraph>Origem/Destino</Paragraph>
            <div>
              <input style={{height: "1.6em"}} name={path + "OrigemSection" + block} value={sections[path + "OrigemSection" + block] || ''} onChange={handleChange} placeholder="Cidade Origem"/>
              <span> - </span>
              <input style={{height: "1.6em"}} name={path + "DestinoSection" + block} value={sections[path + "DestinoSection" + block] || ''} onChange={handleChange} placeholder="Cidade Destino"/>
            </div>
                   
            <span>Saída: </span>
            <input name={path + "SaidaSection" + block} value={sections[path + "SaidaSection" + block] || ''} onChange={handleChange} placeholder="Horário Saída"></input>
            <span> / Chegada: </span>
            <input name={path + "ChegadaSection" + block} value={sections[path + "ChegadaSection" + block] || ''} onChange={handleChange} placeholder="Horário Chegada"></input>
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
      departureSaidaSection0: '',
      departureChegadaSection0: '',
      returnCiaAerea: '',
      returnCodSection0: '',
      returnOrigemSection0: '',
      returnDestinoSection0: '',
      returnSaidaSection0: '',
      returnChegadaSection0: '',
      departure: [],
      return: [],
      value: '',
      numberOfDepartures: 0,
      numberOfReturns: 0

    }
  );

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;

    setSections({[name]: newValue});
  }

  const addPath = (path) => {
    let choosenPath = sections[path];
    if (choosenPath.length === 0) {
      choosenPath.push(1);
      setSections({[path]: choosenPath})
    } else {
      choosenPath.push(choosenPath[choosenPath.length - 1] + 1);
      setSections({[path]: choosenPath});
    }
  }

  const deleteSection = (path, idx) => {
    let choosenPath = sections[path];
    const newSections = choosenPath.filter(section => section !== idx);
    delete sections[path + "CiaAerea" + idx];
    delete sections[path + "CodSection" + idx];
    delete sections[path + "OrigemSection" + idx];
    delete sections[path + "DestinoSection" + idx];
    delete sections[path + "SaidaSection" + idx];
    delete sections[path + "ChegadaSection" + idx];
    setSections({[path]: newSections});
  }

  const generateImage = () => { 
    console.log(sections);
    let flatKeys = Object.entries(sections) // extrai os conjuntos em chave e valor
                                   .map(entry => entry[0]) // pega somente a chave 
                                   .map(key => key.split(/([0-9]+)/)) // extrai os números dos textos das chaves
                                   .flat() // junta tudo em um array só
    let numberOfDepartures = flatKeys.filter(i => i === "departureCiaAerea").length;
    let numberOfReturns = flatKeys.filter(i => i === "returnCiaAerea").length;
    console.log(numberOfDepartures, numberOfReturns);
    setSections(
      {
        "numberOfReturns": numberOfReturns,
        "numberOfDepartures": numberOfDepartures
      }
    );
  };

  return (
    <>
      <Flex container flexDirection="column">
        <Layout>
          <div>
            <FlightInput 
              path="departure"
              sections={sections} 
              handleChange={handleChange}
              addPath={addPath}
            />

            <Section 
              path="departure"
              sections={sections}
              blocks={sections.departure}
              handleChange={handleChange}
              deleteSection={deleteSection}
            />
          </div>
          
          <div>
            <FlightInput 
              path="return"
              sections={sections}
              handleChange={handleChange}
              addPath={addPath}
            />
            
            <Section 
              path="return"
              sections={sections}
              blocks={sections.return}
              handleChange={handleChange}
              deleteSection={deleteSection}
            />
          </div>
          <div style={{ marginTop: "40px"}} className="button-image">
            <div>
              <span>VALOR: </span>
              <input style={{height: "1.6em"}} type="number" name="valor-passagem" placeholder="Valor da passagem" onChange={handleChange}/>
            </div>
            <Button inputColor="green" inputBorder="2px solid green" onClick={() => generateImage()}>Gerar Imagem</Button>
          </div>
        </Layout>
        <>
        {console.log(sections.numberOfDepartures)}
          {[...Array(sections.numberOfDepartures)].map((_, idx) => {
            return (
              <>
                <Flex container justifyContent="space-between">
                  <div>
                    <p className="block-input" key={"CiaAerea" + idx}>{sections.departureCiaAerea}</p>
                    <p className="block-input" key={"departureCodSection0"}>{sections["departureCodSection" + idx]}</p>
                  </div>
                </Flex>
                <div style={{marginLeft: "4em"}}>
                  <Paragraph>Origem/Destino</Paragraph>
                  <div>
                    <span style={{height: "1.6em"}} name={"departureOrigemSection" + idx}>{sections["departureOrigemSection" + idx]}</span>
                    <span> - </span>
                    <span style={{height: "1.6em"}} name={"departureDestinoSection" + idx}>{sections["departureDestinoSection" + idx]}</span>
                  </div>
                       
                  <span>Saída: </span>
                  <span name={"departureSaidaSection" + idx}>{sections["departureSaidaSection" + idx]}</span>
                    <span> / Chegada: </span>
                  <span name={"departureChegadaSection" + idx}>{sections["departureChegadaSection" + idx]}</span>
                </div>
              </>
            )
          })}

          {[...Array(sections.numberOfReturns)].map((_, idx) => {
            return (
              <>
                <Flex container justifyContent="space-between">
                  <div>
                    <p className="block-input" key={"CiaAerea" + idx}>{sections.returnCiaAerea}</p>
                    <p className="block-input" key={"returnCodSection0"}>{sections["returnCodSection" + idx]}</p>
                  </div>
                </Flex>
                <div style={{marginLeft: "4em"}}>
                  <Paragraph>Origem/Destino</Paragraph>
                  <div>
                    <span style={{height: "1.6em"}} name={"returnOrigemSection" + idx}>{sections["returnOrigemSection" + idx]}</span>
                    <span> - </span>
                    <span style={{height: "1.6em"}} name={"returnDestinoSection" + idx}>{sections["returnDestinoSection" + idx]}</span>
                  </div>
                       
                  <span>Saída: </span>
                  <span name={"returnSaidaSection" + idx}>{sections["returnSaidaSection" + idx]}</span>
                    <span> / Chegada: </span>
                  <span name={"returnChegadaSection" + idx}>{sections["returnChegadaSection" + idx]}</span>
                </div>
              </>
            )
          })}
        </>
      </Flex>
    </>
  )
}

export default Cotacao;

