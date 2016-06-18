
<div id="Top" style="padding-left: 0px;">
  <ul class="collection with-header">
          <li class="collection-header"><h4>{{type}}</h4></li>

  					{% for player in top %}
          <li class="collection-item">{{ player.name }}<span class="badge"> Correct Answers:{{ player.nrAnswer }}</span> </li>
  					{% endfor %}

  </ul>
</div>
