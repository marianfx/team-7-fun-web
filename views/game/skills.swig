 <!-- CHEAT -->
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Try to guess the answer based on your cheat points. <br> You have: {{ skills.S_CHEAT }} {% if skills.S_CHEAT == 1 %}point {% else %}points{% endif %}" id="cheatButton"><i class="material-icons left">visibility</i>Cheat</a>
</li>

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_CHEAT"><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}

<!-- LUCK -->
<!-- IF S_LUCK > 0 button enable => add the modal-trigger class and the href attribute -->
{% if skills.S_LUCK >= Math.ceil(skills.PLAYERLEVEL / 3) %}
<li>
    <a class="modal-trigger tooltipped waves-effect waves-light cyan" href="#luckContent" data-position="bottom" data-delay="50" data-tooltip="Lose {{ Math.ceil(skills.PLAYERLEVEL / 3) }} luck points to roll dices and win prizes. <br> You have: {{ skills.S_LUCK }} {% if skills.S_LUCK == 1 %}point {% else %}points{% endif %}" id="openLuckButton" ><i class="mdi-action-wallet-giftcard left"></i>Luck</a>
</li>
{% else %}
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="You need {{ Math.ceil(skills.PLAYERLEVEL / 3) }} luck points to use this.<br>You have: {{ skills.S_LUCK }} {% if skills.S_LUCK == 1 %}point {% else %}points{% endif %}"><i class="mdi-action-wallet-giftcard left"></i>Luck</a>
</li>
{% endif %}

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_LUCK"><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}

<!-- TIME -->
{% if skills.S_TIME >= Math.ceil(skills.PLAYERLEVEL / 3) %}
<li>
    <a id="timeBtn" class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Get extra time per round proportionally to your time points. Points: {{ skills.S_TIME }}"><i class="material-icons left">av_timer</i>Time</a>
</li>
{% else %}
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="You need {{ Math.ceil(skills.PLAYERLEVEL / 3) }} luck points to use this.<br>You have: {{ skills.S_TIME }} {% if skills.S_TIME == 1 %}point {% else %}points{% endif %}" id="addTimeButton"><i class="material-icons left">av_timer</i>Time</a>
</li>
{% endif %}

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_TIME" ><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}
