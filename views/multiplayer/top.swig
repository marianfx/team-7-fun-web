
  <ul class="collection with-header center-align ">
          <li class="collection-header"><h4>{{type}}</h4></li>

  					{% for player in top %}
          <li class="collection-item">{{ player.name }}<span class="left-align green-text"> Correct Answers:{{ player.nrAnswer }}</span> </li>
  					{% endfor %}

  </ul>
