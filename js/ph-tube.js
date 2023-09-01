const loadCategories = async() => {
    const response = await fetch(' https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // console.log(data.data)
    categoryDisplay(data.data);
    
}

const categoryDisplay = (categories) =>{
    // console.log(categories)

    const categoryContainer= document.getElementById('category-container');

    categories.forEach(category =>{
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="btn" onclick="showCards('${category.category_id}')">${category.category}</div>
        
        `
        categoryContainer.appendChild(div);
    })

}


const showCards = async(categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(data.data)
    displayCards(data.data);

    
}

const displayCards =(cards)=>{

    
    // console.log(Array.isArray(cards));

    const sortByView = document.getElementById('sort-by-view')
    sortByView.addEventListener( 'click', function(){
      cards.sort(function (a, b) {       
          return parseFloat(b.others.views)- parseFloat(a.others.views);     
          });

          displayCards(cards);
  })

    // console.log(cards);
    

    const cardsContainer = document.getElementById('cards-container');
    const noData = document.getElementById('no-data');
    cardsContainer.textContent= '';
    noData.textContent= '';


    if(cards.length !== 0){

    cards.forEach(card =>{
        const div = document.createElement('div');

        const sec= card.others.posted_date;
        let hour = Math.floor(sec/3600);
        let extra = sec%3600;
        let min = Math.floor(extra/60);
        let time = hour + ' ' + 'hrs' + ' ' + min + ' '+ 'min' + ' ' + 'ago';
        // console.log(time);
        
        // console.log(time);
        const verified = card.authors[0].verified;
        // console.log(verified);

            div.innerHTML = `
            <div>
                <div class="">
                    <div class="relative text-end">
                      <img src="${card.thumbnail}" alt="" class="h-40 w-full" />
                      <div class="absolute bottom-0 -mx-1 my-1 w-full">
                        <button class="bg-gray-900 text-white text-xs rounded-sm">${hour !== 0 && min !== 0 ? time : ''}</button>
                      </div>
                    </div>
                    <div class="flex items-start mt-4">
                      <div class="mr-3">
                        <img src="${card.authors[0].profile_picture}" alt="" class="rounded-full h-8 w-8" />
                      </div>
                      <div>
                        <h2 class="text-base font-medium">${card.title}</h2>
                        <div class="flex text-sm items-center">
                            <p>${card.authors[0].profile_name}</p>
                            <div class="ms-1">
                               ${verified ? '<img src="./images/verified.svg" alt="">' : ''}
                            </div>
                            
                        </div>
                        <p class="text-xs">${card.others.views}</p>
                      </div>
                    </div>
                  </div>
    
            </div>           
            `                          
        cardsContainer.appendChild(div);
    })
}
 else{
        const div = document.createElement('div');
        div.innerHTML = `
               <div class="text-center">
                   <img src="./images/Icon.png" alt="" class="w-1/4 mx-auto">
                    <p class="text-2xl text-red-500">Sorry! No data found.</p>
               </div>

        `
        noData.appendChild(div);
 }


}



loadCategories();
showCards("1000")

