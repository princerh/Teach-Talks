let count = 0;
const loadingSpinner = document.getElementById("loading-spinner");
let spinnerTimeout;

const toggleLoadingSpinner = (isLoading, allPost) => { 
    if (isLoading) { 
        loadingSpinner.classList.remove("hidden");
        spinnerTimeout = setTimeout(() => {
            loadingSpinner.classList.add("hidden");
            singlePost(allPost);
        }, 2000);
    }
}

const allPost = async (category) => {
    

    const mainUrl = "https://openapi.programming-hero.com/api/retro-forum/posts"
    const url = category?`${mainUrl}?category=${category}`:mainUrl;
    const response = await fetch(url)
    const data = await response.json();
    const allPost = data.posts;
    toggleLoadingSpinner(true, allPost);
    
}

const singlePost = (allPost) => {
    const postContainer = document.getElementById("postContainer");
    

    allPost.forEach((onePost) => {
        const div = document.createElement("div");
        div.classList = `hero bg-[#797DFC1A] rounded-3xl shadow-xl`;

        const checkStatus = onePost.isActive;
        const greenBgClass = checkStatus ? "bg-green-500" : "bg-red-500";

        div.innerHTML = `
            <div class="hero-content flex-col items-start gap-5 lg:flex-row">
                <div class="avatar relative ">
                    <div class="w-24 rounded-xl ">
                    <div id="green" class="w-4 h-4 rounded-full left-[108px] -top-1 ${greenBgClass} absolute z-20"></div>
                        <img class="z-0" src="${onePost.image}" />
                    </div>
                    
                </div>
                <!-- text of card  -->
                <div class="flex flex-col gap-3">
                    <!-- music  -->
                    <div class="flex gap-10 inter font-medium text-[#12132DCC]">
                        <p># <span>${onePost.category}</span></p>
                        <p>Author : <span>${onePost.author.name}</span></p>
                    </div>
                    <!-- title of card  -->
                    <div class="pb-5 border-b-2 border-black border-dashed space-y-5">
                        <h3 class="mulish font-bold text-[#12132D] text-2xl">${onePost.title}</h3>
                        <p class="inter font-normal text-xl text-[12132D99]">${onePost.description}</p>
                    </div>
                    <!-- message  -->
                    <div class="flex justify-between items-center">
                        <!-- icons only -->
                        <div class="text-[#12132DCC] inter font-normal text-xs flex items-center gap-7 ">
                            <!-- text message -->
                            <div class="flex items-center gap-3">
                                <img src="./icons/message.png" alt="">
                                <p>${onePost.comment_count}</p>
                            </div>
                            <!-- eye  -->
                            <div class="flex items-center gap-3">
                                <img src="./icons/eye.png" alt="">
                                <p>${onePost.view_count}</p>
                            </div>
                            <!-- watch  -->
                            <div class="flex items-center gap-3">
                                <img src="./icons/watch.png" alt="">
                                <p>${onePost.posted_time}</p>
                            </div>
                        </div>
                        <!-- message green box -->
                        <div>
                            <img onclick="addData('${onePost.title.replace("'", "\\'")}', '${onePost.view_count}')" class="cursor-pointer" src="./icons/greemsg.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(div);
    })

}

document.getElementById("searchButton").addEventListener("click", () => {
    // toggleLoadingSpinner(true);
    postContainer.innerHTML = '';
    const postSearched = document.getElementById("inputPost").value;
    allPost(postSearched);

        // toggleLoadingSpinner(false);
})

const addData = (title, views) => {
    count++;
    const mainTitles = document.getElementById("mainTitles");

    const div = document.createElement("div");
    div.classList = `bg-white rounded-xl p-3 flex items-center justify-between shadow-xl`
    div.innerHTML = `
        <div class="mulish font-extrabold text-[#12132D] w-11/12 text-xs"><h3>${title}</h3></div>
        <div class="flex gap-2 pr-4 items-center">
            <img src="./icons/eye.png" alt="">
            <p class="text-[#12132D99] inter font-normal text-xs">${views}</p>
        </div> 
    `;
    mainTitles.appendChild(div);

    const markNumber = document.getElementById("markNumber");
    markNumber.innerText = count;
}

allPost();
