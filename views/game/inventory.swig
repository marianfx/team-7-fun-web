<h4 class="col s12 cyan-text text-darken-2">{{ playerName }}'s Inventory</h4>

{% if items.length === 0 %}

  <h5 class="col s12 cyan-text text-darken-2">No items to display.</h5>

{% else %}

  {% for item in items %}

    <div class="col s6 m4 l3">
        <div class="card hoverable">
            <div class="card-image waves-effect waves-block waves-light" >
                <img class="activator resizeimg" src="{{ item.filePath }}" >
            </div>
            <div class="card-content center-align">
                <span class="grey-text text-darken-4 itemName">{{ item.name }}</span>
            </div>

            <div class="card-reveal" >
                <p class="card-title grey-text text-darken-4 itemDescription">{{ item.description }}</p>
            </div>
        </div>
    </div>

  {% endfor %}

{% endif %}