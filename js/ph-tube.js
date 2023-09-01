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


    cards.sort(function (a, b) {
        return parseFloat(b.others.views)- parseFloat(a.others.views)
        });

        console.log(cards);

    const cardsContainer = document.getElementById('cards-container');
    const noData = document.getElementById('no-data');
    cardsContainer.textContent= '';
    noData.textContent= '';


    if(cards.length !== 0){

    cards.forEach(card =>{
        const div = document.createElement('div');

        const verified = card.authors[0].verified;

        if(verified===true){

            div.innerHTML = `
            <div>
                <div class="">
                    <img src="${card.thumbnail}" alt="" class="h-40 w-full" />
                    <div class="flex items-start mt-4">
                      <div class="mr-3">
                        <img src="${card.authors[0].profile_picture}" alt="" class="rounded-full h-8 w-8" />
                      </div>
                      <div>
                        <h2 class="text-base font-medium">${card.title}</h2>
                        <div class="flex text-sm">
                            <p>${card.authors[0].profile_name}</p>
                            <img src="./images/verified.svg" alt="">
                        </div>
                        <p class="text-xs">${card.others.views}</p>
                      </div>
                    </div>
                  </div>
    
            </div>           
            `            
        }
        else{
                div.innerHTML = `
                <div>
                    <div class="">
                        <img src="${card.thumbnail}" alt="" class="h-40 w-full" />
                        <div class="flex items-start mt-4">
                          <div class="mr-3">
                            <img src="${card.authors[0].profile_picture}" alt="" class="rounded-full h-8 w-8" />
                          </div>
                          <div>
                            <h2 class="text-base font-medium">${card.title}</h2>
                            <div class="flex text-sm">
                                <p>${card.authors[0].profile_name}</p>
                                
                            </div>
                            <p class="text-xs">${card.others.views}</p>
                          </div>
                        </div>
                      </div>
        
                </div>
                
                `             
            }
        // console.log(verified)
        
       
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
