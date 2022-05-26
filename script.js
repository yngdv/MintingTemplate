let isLoaded = false;
let mintingAmount = 1;
let blockNumber = 0;
let account = null;
let interval = null;

let btnConnectWallet = document.querySelector(".connect_wallet");
let balanceTitle = document.querySelector(".balance_title");
let balanceCount = document.querySelector(".balance_count");
let walletAddr = document.querySelector(".wallet_addr");
let mintingStart = document.querySelector(".mintingstart_description");
let btnMinus = document.querySelector(".btn_minus");
let btnPlus = document.querySelector(".btn_plus");
let amount = document.querySelector(".amount");
let priceCount = document.querySelector(".price_count");
let btnMinting = document.querySelector(".btn_minting");

document.addEventListener("DOMContentLoaded", async function () {
    isLoaded = true;
});

btnMinting.addEventListener("click", function(){
    alert("데모페이지이기 때문에 민팅은 이루어지지 않습니다!");
})

btnMinus.addEventListener("click", function(){
    if(!btnMinus.classList.contains("untouchable") && mintingAmount >= 1){
        mintingAmount --;
        amount.innerHTML = '<span class="highlight">' + mintingAmount + '</span>';
        btnPlus.classList.remove("untouchable");
        priceCount.innerHTML = 300 * mintingAmount + " KLAY";
        if(mintingAmount <= 1){
            btnMinus.classList.add("untouchable")
        }
    }
});

btnPlus.addEventListener("click", function(){
    if(!btnPlus.classList.contains("untouchable") && mintingAmount < 3){
        mintingAmount ++;
        amount.innerHTML = '<span class="highlight">' + mintingAmount + '</span>';
        btnMinus.classList.remove("untouchable");
        priceCount.innerHTML = 300 * mintingAmount + " KLAY";
        if(mintingAmount >= 3){
            btnPlus.classList.add("untouchable")
        }
    }
});

btnConnectWallet.addEventListener("click", async function(){
if(isLoaded){
    try {
        const accounts = await klaytn.enable();

        if (!accounts) {
            alert("크롬 웹 스토어에서 Kaikas(카이카스) 확장 프로그램을 추가해주세요!");
            return;
        }else{
            if (klaytn.networkVersion === 8217) {
                alert("메인넷에 연결되었습니다!");
            } else if (klaytn.networkVersion === 1001) {
                alert("테스트넷에 연결되었습니다!");
            } else {
                alert("클레이튼 네트워크에 연결되지 않았습니다! 새로고침 후 다시 시도해주시기 바랍니다!");
                return;
            }
        }
    
        check_status();
    
        account = accounts[0];
        balanceTitle.innerHTML = "Balance(" + account.substr(0,8)+"...)";
        walletAddr.innerHTML = account.substr(0,8)+"...";
    
        caver.klay.getBalance(account)
            .then(function (balance) {
                balanceCount.innerHTML = Math.floor(caver.utils.fromPeb(balance, "KLAY")) + " KLAY";
            });
    } catch (err) {
        alert("크롬 웹 스토어에서 Kaikas(카이카스) 확장 프로그램을 추가해주세요!");
    }
    }
})

async function check_status() {
    blockNumber = await caver.klay.getBlockNumber();
    document.querySelector(".currentblock_description").innerHTML = "#" + blockNumber;
    countBlockNumber();
    mintingStart.innerHTML = '<span class="highlight"> #' + (blockNumber + 3600) + '</span>';
}

function countBlockNumber() {
    clearInterval(interval);
    interval = setInterval(function(){
        blockNumber+=1;
        document.querySelector(".currentblock_description").innerHTML = "#" + blockNumber;
    }, 1000);
}