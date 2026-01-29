// import React,{ useState } from 'react';
// import LangList from './LangList';
// // import axios from 'axios';
// import copy_icon from '../../assets/copy_icon.gif';
// import download_icon from '../../assets/download_logo.png';
// import { toast } from 'react-hot-toast';


// function Python() {

//   const [code,setCode] = useState('');
//   const [output,setOutput] = useState('');

//   const handleSubmit = async ()=>{
//     toast.loading('Please Wait while File is Execuing');
//     const payload = {
//       language:"py",
//       code
//     };

//     try{

//       // const {data} = await axios.post("http://localhost:5000/runpy",payload)
//       const response = await fetch("https://codo-world-backendb.onrender.com",{
//         method:'POST',
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body:JSON.stringify(payload)
//       })
//       const data = await response.json()
//       if(response.ok){
//         toast.remove();
//         setOutput(data.output);
//         toast.success("Executed Successfully.");
//       }
//       else{
//         setOutput(data.error);
//         toast.remove();
//         toast.error("An error Occured.");
//       }
      
//     }catch(err){
//       toast.remove();
//       setOutput("Error in communication with the server")
//       toast.error("Please Enter Valid Python Code");
//       console.log(`error is in python.js .The error : ${err}`);
//     }
//   }

//   const clear = ()=>{
//     toast.success('Output Cleared')
//     const box = document.querySelector("#consoleOutput p");
//     box.innerText = "";
//   }

//   const copyContent = ()=>{
//     toast.success("Copied")
//     navigator.clipboard.writeText(code);
//   }

//   const codeToFile = ()=>{
//     toast.success('File is Downloading...')
//     const text = document.querySelector('#python').value;
    
//     const blob = new Blob([text],{type:"text/python"});

//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = "codofile-python.py";
//     link.click();
//   }


//   return (
//     <> 
//       <div className="voiceContainer">
//             <div className="voiceBody wholeeditorBody">
//                 <div className="leftLang">
//                     <LangList leftcolorpy="white"/>
//                 </div>
//                 <div className="PlaygroundMain">
//                 <div className='runHeaderJS'>
//                     <div className='jsleftheaderfile jsfile'>
//                       <mark><h2>index.py</h2></mark>
//                       <div className='runbtn'>
//                       <button className='vbtn'>
//                       <img className='voicebtn' onClick={copyContent} src={copy_icon} alt='copy'/>
//                       </button>
//                       <button className='vbtn'>
//                       <img className='voicebtn' onClick={codeToFile} src={download_icon} alt='download'/>
//                       </button>
//                         <button className='btn' onClick={handleSubmit}>RUN</button>
//                       </div>
//                     </div>
//                     <div className='jsrightheaderfile jsfile'>
//                       <mark><p>OUTPUT</p></mark>
//                       <button className='clear' onClick={clear}>Clear</button>
//                     </div>
//                   </div>
//                   <div className='jsplayground playground'>
//                     <div className='leftplayground snippet'>
//                     <textarea className='dartpython' name="python" id="python" value={code} onChange={(e)=>setCode(e.target.value)} placeholder='print("hello codoPlayers")'></textarea>
//                     </div>
//                     <h1 className="invisible">
//                       <mark>Output</mark>
//                     </h1>
//                     <div className='rightplayground snippet' id='consoleOutput' >
//                     <p>{output}</p>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Python

import React, { useEffect, useState } from 'react';
import LangList from './LangList';
import copy_icon from '../../assets/copy_icon.gif';
import download_icon from '../../assets/download_logo.png';
import { toast } from 'react-hot-toast';

function Python() {

  const [code, setCode] = useState('');
  const [pyodide, setPyodide] = useState(null);

  // Load Pyodide once
  useEffect(() => {
    const loadPyodide = async () => {
      toast.loading("Loading Python Environment...");
      const py = await window.loadPyodide();
      setPyodide(py);
      toast.remove();
      toast.success("Python Ready 🚀");
    };
    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      toast.error("Python not ready yet");
      return;
    }

    try {
      toast.success("Code Execution Started");

      const output = await pyodide.runPythonAsync(`
import sys
from io import StringIO

_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

${code}

sys.stdout = _stdout
mystdout.getvalue()
      `);

      document.getElementById("consoleOutput").innerText = output;

    } catch (err) {
      document.getElementById("consoleOutput").innerText = err;
      toast.error("Invalid Python Code");
    }
  };

  const clear = () => {
    document.getElementById("consoleOutput").innerText = "";
    toast.success("Output Cleared");
  };

  const copyContent = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied");
  };

  const codeToFile = () => {
    const blob = new Blob([code], { type: "text/python" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CodoFile.py";
    link.click();
    toast.success("Download Started");
  };

  return (
    <>
      <div className="voiceContainer">
        <div className="voiceBody wholeeditorBody">
          <div className="leftLang">
            <LangList leftcolorpy="white" />
          </div>

          <div className="PlaygroundMain">
            <div className='runHeaderJS'>
              <div className='jsleftheaderfile jsfile'>
                <mark><h2>index.py</h2></mark>

                <div className='runbtn'>
                  <button className='vbtn'>
                    <img src={copy_icon} alt="copy" onClick={copyContent} />
                  </button>

                  <button className='vbtn'>
                    <img src={download_icon} alt="download" onClick={codeToFile} />
                  </button>

                  <button className='btn' onClick={runCode}>RUN</button>
                </div>
              </div>

              <div className='jsrightheaderfile jsfile'>
                <mark><p>OUTPUT</p></mark>
                <button className='clear' onClick={clear}>Clear</button>
              </div>
            </div>

            <div className='jsplayground playground'>
              <div className='leftplayground snippet'>
                <textarea
                  className='dartpython'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='print("Hello CodoPlayer")'
                />
              </div>

              <div className='rightplayground snippet' id="consoleOutput"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Python;
