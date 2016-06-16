<div class="row">

    <h4 class="cyan-text text-darken-2">Top Player By {{ header }} </h4>

        <ul class="collection">

            {% for player in players %}
                <li class="collection-item avatar">
                  <img src="{{ player.PHOTOURL }}" alt="{{ player.PLAYERNAME }}'s photo" class="circle">
                  <span class="title cyan-text text-darken-2"> {{ player.PLAYERNAME }} </span>
                  <p> 
                        <b>{{ header }}</b> : {{ player.VALUE }}
                  </p>
                </li>

            {% endfor %}
            
        </ul>

</div>