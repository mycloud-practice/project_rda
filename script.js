let switches = {1:0,2:0,3:0};

const riddles = {
  1: { 
    question: "The Tiny Switch: I'm a switch with no hands, controlling currents as the system demands. On or off, I make the call. What am I?", 
    options: ["Diode","Transistor","Battery"],
    answer: "Transistor"
  },
  2: { 
    question: "The One-Way Street: I let current flow in only one way, protecting your circuits every day. What am I?", 
    options: ["LED","Diode","Switch"],
    answer: "Diode"
  },
  3: { 
    question: "The Energy Saver: The more you draw from me, the lower I go. I store power in a chemical way to save your day. What am I?", 
    options: ["Capacitor","Battery","Microprocessor"],
    answer: "Battery"
  }
};

function nextStep(){
  document.getElementById("intro").classList.remove("active");
  document.getElementById("circuit-card").classList.add("active");
}

function openRiddle(num){
  if(switches[num]===1) return;
  const modal = document.getElementById("riddleModal");
  modal.style.display="flex";
  document.getElementById("riddleQuestion").innerText=riddles[num].question;
  const optionsDiv = document.getElementById("riddleOptions");
  optionsDiv.innerHTML="";
  riddles[num].options.forEach(opt=>{
    const btn=document.createElement("button");
    btn.innerText=opt;
    btn.onclick=()=>checkAnswer(num,opt);
    optionsDiv.appendChild(btn);
  });
}

function closeRiddle(){ document.getElementById("riddleModal").style.display="none"; }

function checkAnswer(num, selected){
  if(selected===riddles[num].answer){
    alert("✅ Correct! Switch turned ON.");
    switches[num]=1;
    document.getElementById(`switch${num}`).innerText=`Switch ${num}: ON`;
    updateWires();
    closeRiddle();
    checkCircuitCompletion();
  } else {
    alert("❌ Wrong! Try again.");
  }
}

function updateWires(){
  document.getElementById('wire1').classList.toggle('glow', switches[1]);
  document.getElementById('wire2').classList.toggle('glow', switches[1] && switches[2]);
  document.getElementById('wire3').classList.toggle('glow', switches[2] && switches[3]);
  document.getElementById('wire4').classList.toggle('glow', switches[1] && switches[2] && switches[3]);
}

function checkCircuitCompletion(){
  if(switches[1]===1 && switches[2]===1 && switches[3]===1){
    document.getElementById('feedback').innerText="🎉 Circuit Complete!";
    document.getElementById('feedback').style.color="#a83279";
    document.getElementById('heart').classList.add('beat');

    // Play music now as reward
    const music = document.getElementById("bgMusic");
    music.volume = 0.3;
    music.play().catch(()=>console.log("User interaction required to play music."));

    // Show final letter after short delay
    setTimeout(()=>{
      document.getElementById("circuit-card").classList.remove("active");
      document.getElementById("final").classList.add("active");
    },1000);
  }
}
