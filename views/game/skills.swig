 <!-- CHEAT -->
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Try to guess the answer based on your cheat points. Points: {{ skills.S_CHEAT }} " id="cheatButton"><i class="material-icons left">visibility</i>Cheat</a>
</li>

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_CHEAT"><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}

<!-- LUCK -->
<!-- IF S_LUCK > 0 button enable => add the modal-trigger class and the href attribute -->
{% if skills.S_LUCK > 0 %}
<li>
    <a class="modal-trigger tooltipped waves-effect waves-light cyan" href="#luckContent" data-position="bottom" data-delay="50" data-tooltip="Lose one luck point to roll dices and win prizes. Points: {{ skills.S_LUCK }}" id="openLuckButton" ><i class="mdi-action-wallet-giftcard left"></i>Luck</a>
</li>
{% else %}
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="You don't have any luck points in order to use this skill."><i class="mdi-action-wallet-giftcard left"></i>Luck</a>
</li>
{% endif %}

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_LUCK"><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}

<!-- TIME -->
<li>
    <a class="tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Get extra time per round proportionally to your time points. Points: {{ skills.S_TIME }}"><i class="material-icons left">av_timer</i>Time</a>
</li>

<!-- IF SKILL POINTS AVAILABLE -->
{% if skills.SKILLPOINTS > 0 %}
<li>
    <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_TIME" ><i class="material-icons left" style="cursor: pointer">add</i></a>
</li>
{% endif %}