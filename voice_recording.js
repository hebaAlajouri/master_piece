// 🎤 Recording setup
let mediaRecorder;
let audioChunks = [];

document.getElementById("record-btn").addEventListener("click", startRecording);
document.getElementById("stop-btn").addEventListener("click", stopRecording);
document.getElementById("play-btn").addEventListener("click", playRecording);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            document.getElementById("waveform").style.opacity = "1";

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
        })
        .catch(err => console.error("Microphone access denied:", err));
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById("waveform").style.opacity = "0.2";
}

function playRecording() {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

// 💾 Save Recording Alert
document.querySelector(".save-btn").addEventListener("click", () => {
    alert("🎉 Your recording has been saved!");
});
