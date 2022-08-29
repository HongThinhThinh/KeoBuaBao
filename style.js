const VALUE = [
    { id: "scissor", value: '✌️' }, // 0
    { id: "rock", value: '👊' }, //1
    { id: "paper", value: '🖐' }, //2
]
// nếu a trừ b được 1 hoặc -2 là thắng
// nếu a trừ b được 0 thì hòa
// nếu a trừ b được -1 hoặc 2 là thua
let i = 0;
const handleChange = () => {
    const computer = document.querySelector('#computer')
    computer.textContent = VALUE[i].value
    computer.dataset.id = VALUE[i].id
    if (i === VALUE.length - 1) {
        i = 0;
    } else {
        i++;
    }
}
// viết 1 hàm liên tục gọi handleChange
// setInterval : gọi callback liên tục sau mỗi milisecond
let interval = setInterval(handleChange, 100)
const playerItem = document.querySelectorAll('.user')
// hàm compare 
const compare = (valuePlayer, valueComputer) => {
    // dựa trên giá trị người dùng tìm vị trí của nó trong mảng VALUES
    const indexUser = VALUE.findIndex(item => item.id === valuePlayer)
    // dựa trên giá trị máy tìm vị trí của nó trong mảng VALUES
    const indexComputer = VALUE.findIndex(item => item.id === valueComputer)
    let check = indexUser - indexComputer 
    if (check == 1 || check == -2) {
        return 1;
    } else if (check == 0) {
        return 0;
    } else {
        return -1;
    }
}
playerItem.forEach(item =>{
    item.addEventListener("click", event =>{
        // dừng thằng máy lại
        clearInterval(interval) // xóa được cái set interval
        let valueComputer = document.querySelector('#computer').dataset.id
        let valuePlayer = event.target.id;
        playerItem.forEach(_item =>{
            _item.classList.remove("actived")
            _item.style.pointerEvents ="none"
        })
        event.target.classList.add("actived")
        let result =  compare(valuePlayer, valueComputer)
        const alerPost = document.createElement("div")
        alerPost.classList.add("alert") // thêm class tên là alert
        let msg =""
        if(result===1){
            msg="Hên dữ z ta"
            alerPost.classList.add("alert-success")
        }else if(result=== -1) {
            msg="Thua con bot HT nữa hỏ =)))"
            alerPost.classList.add("alert-dark")
        } else {
            msg="Bạn chỉ bằng con HT bot thôi =))))))))"
            alerPost.classList.add("alert-warning")
        }
        alerPost.textContent =msg
        document.querySelector('.notification').appendChild(alerPost)
        document.querySelector('#play-again').classList.remove("d-none")
    })
})

document.querySelector(".btn-play-again").addEventListener("click", event =>{
    interval = setInterval(handleChange,100)
    playerItem.forEach(item =>{
        item.classList.remove("actived")
        item.style.pointerEvents= ""
    })
    document.querySelector(".notification").innerHTML = ""
    document.querySelector('#play-again').classList.add("d-none")
})
