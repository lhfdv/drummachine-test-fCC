const audioTunes = [
{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



function App() {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);
  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
  };
  return (
    React.createElement("div", { className: "bg-primary min-vh-200 text-white" },
    React.createElement("div", { classname: "float-center" },
    React.createElement("h2", null, "Drum Machine for fCC"),
    audioTunes.map((clip) =>
    React.createElement(Pad, { key: clip.id, clip: clip, volume: volume, setRecording: setRecording })),

    React.createElement("br", null),
    React.createElement("h4", null, "Volume"),
    React.createElement("input", { type: "range", step: "0.01", value: volume, max: "1", min: "0", className: "w-50", onChange: e => setVolume(e.target.value) }),
    React.createElement("h3", null, recording),
    recording &&
    React.createElement(React.Fragment, null,
    React.createElement("button", { onClick: playRecording, className: "btn btn-success" }, "play"),
    React.createElement("button", { onClick: () => setRecording(""), className: "btn btn-danger" }, "clear"),
    React.createElement("input", { type: "range", step: "0.01", value: volume, max: "1.2", min: "0.1", className: "w-50", onChange: e => setSpeed(e.target.value) })))));






}

function Pad({ clip, volume, setRecording }) {

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = e => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 260);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording(prev => prev + clip.keyTrigger + " ");
  };

  return (
    React.createElement("div", { onClick: playSound, className: `btn btn-secondary p-4 m-3 ${active && "btn-danger"}` },
    React.createElement("audio", { className: "clip", id: clip.keyTrigger, src: clip.url }),
    clip.keyTrigger));


}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));