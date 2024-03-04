const loadLatestData = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    const data = await response.json();
    const allLatest = data;
    setLatestData(allLatest);
}


const setLatestData = (allLatest) => {

    const latestContainer = document.getElementById("latestContainer");
allLatest.forEach((singleData) => {
    const div = document.createElement("div");
    div.classList = `flex flex-col gap-3 p-5 border rounded-xl shadow-xl`
    div.innerHTML = `
    <div class="rounded-xl">
        <img class="rounded-xl" src="${singleData.cover_image}" alt="">
    </div>
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
            <i class="fa-regular fa-calendar-days"></i>
            <p class="text-[#12132D99] text-xs mulish
            font-normal">${singleData.author.posted_date || 'No Published Date'}</p>
        </div>
        <h3 class="text-[#12132D] text-xs font-extrabold mulish">${singleData.title}</h3>
        <p class="text-[#12132D99] text-xs mulish
         font-normal">${singleData.description}</p>
        <div class="flex items-center gap-5 mt-2">
            <div>
                <img class="rounded-full w-[60px]" src="${singleData.profile_image}" alt="">
            </div>
            <div class="flex flex-col gap-2">
                <h4 class="font-bold text-[#12132D] mulish
                 text-xs">${singleData.author.name}</h4>
                <p class="text-[#12132D99] mulish font-normal text-xs">${singleData.author.designation || 'Unknown'}</p>
            </div>
        </div>
    </div>
    `
    latestContainer.appendChild(div);
})
}

loadLatestData();