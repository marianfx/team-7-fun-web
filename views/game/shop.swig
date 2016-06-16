{% for item in items %}
<div class="col s6 m4 l3">
    <div class="card hoverable">

        <div class="card-image waves-effect waves-block waves-light imagewrap" >
            <img class="activator resizeimg" src="{{ item.FILEPATH}}" >
            <a class="waves-effect waves-teal cyan btn-floating buyButton center-align" id="buyItem_{{ item.ITEMID}}">Buy</a>
        </div>
        <div class="card-content center-align s12 itemShopCard">
            <span class="grey-text text-darken-4 itemName">{{ item.NAME }}</span>

            <br>
            <span class="valign">Skill points: {{ item.SKILLPOINTS }}</span>

            <div class="valign-wrapper itemprice">
                <span class="valign">Cost: {{ item.COOKIESCOST }}</span>
                <img class="circle responsive-img valign" src="images/cookies.png" width="20px" style="margin-left: 2px">
            </div>

            
            
        </div>

        <div class="card-reveal" >
            <p class="card-title grey-text text-darken-4 itemDescription">{{ item.DESCRIPTION }}</p>
        </div>
    </div>
</div>
{% endfor %}