 <!-- Menu when it appears UP -->
 <span class="hide-on-med-and-down">
    <!-- CHEAT -->
    <li>
        <a class="cheatButton tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Try to guess the answer based on your cheat points. <br> You have: {{ skills.S_CHEAT }} {% if skills.S_CHEAT == 1 %}point {% else %}points{% endif %}"><i class="material-icons left">visibility</i>Cheat</a>
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
        <a class="openLuckButton modal-trigger tooltipped waves-effect waves-light cyan" href="#luckContent" data-position="bottom" data-delay="50" data-tooltip="Lose {{ Math.ceil(skills.PLAYERLEVEL / 3) }} luck points to roll dices and win prizes. <br> You have: {{ skills.S_LUCK }} {% if skills.S_LUCK == 1 %}point {% else %}points{% endif %}"><i class="mdi-action-wallet-giftcard left"></i>Luck</a>
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
        <a class="timeBtn tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="Get extra time per round proportionally to your time points. Points: {{ skills.S_TIME }}"><i class="material-icons left">av_timer</i>Time</a>
    </li>
    {% else %}
    <li>
        <a class="addTimeButton tooltipped waves-effect waves-light cyan" data-position="bottom" data-delay="50" data-tooltip="You need {{ Math.ceil(skills.PLAYERLEVEL / 3) }} luck points to use this.<br>You have: {{ skills.S_TIME }} {% if skills.S_TIME == 1 %}point {% else %}points{% endif %}"><i class="material-icons left">av_timer</i>Time</a>
    </li>
    {% endif %}

    <!-- IF SKILL POINTS AVAILABLE -->
    {% if skills.SKILLPOINTS > 0 %}
    <li>
        <a class="waves-effect waves-light cyan addSkillPoint"  skill="S_TIME" ><i class="material-icons left" style="cursor: pointer">add</i></a>
    </li>
    {% endif %}
</span>


<!-- Menu when it appears Left -->
<span class="hide-on-large-only show-on-medium-and-down">
    <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
            <li class="bold">
                <a class="collapsible-header waves-effect waves-cyan">
                    <i class="material-icons left">visibility</i>
                    Cheat ({{ skills.S_CHEAT }}p)
                </a>
                <div class="collapsible-body">
                    <ul>
                        <li>
                            <a class="cheatButton waves-effect waves-cyan">
                                <i class="material-icons left">repeat_one</i>
                                Use
                            </a>
                        </li>
                        {% if skills.SKILLPOINTS > 0 %}
                            <li>
                                <a class="waves-effect waves-light addSkillPoint" skill="S_CHEAT">
                                    <i class="material-icons left" style="cursor: pointer">add</i>
                                    Add Skill
                                </a>
                            </li>
                        {% endif %}
                    </ul>
                </div>
            </li>
        </ul>
    </li>

    <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
            <li class="bold">
                <a class="collapsible-header waves-effect waves-cyan">
                    <i class="mdi-action-wallet-giftcard left"></i>
                    Luck ({{ skills.S_LUCK }}p)
                </a>
                <div class="collapsible-body">
                    <ul>
                        <li>
                            {% if skills.S_LUCK >= Math.ceil(skills.PLAYERLEVEL / 3) %}
                                <a class="openLuckButton modal-trigger waves-effect waves-cyan" href="#luckContent">
                                    <i class="material-icons left">repeat_one</i>
                                    Use ({{ Math.ceil(skills.PLAYERLEVEL / 3) }}p)
                                </a>
                            {% else %}
                                <a class="waves-effect waves-cyan">
                                    <i class="material-icons left">trending_up</i>
                                    You need ({{ Math.ceil(skills.PLAYERLEVEL / 3) }}p)
                                </a>
                            {% endif %}
                        </li>
                        {% if skills.SKILLPOINTS > 0 %}
                            <li>
                                <a class="waves-effect waves-light addSkillPoint" skill="S_LUCK">
                                    <i class="material-icons left" style="cursor: pointer">add</i>
                                    Add Skill
                                </a>
                            </li>
                        {% endif %}
                    </ul>
                </div>
            </li>
        </ul>
    </li>
    <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
            <li class="bold">
                <a class="collapsible-header waves-effect waves-cyan">
                    <i class="material-icons left">av_timer</i>
                    Time ({{ skills.S_TIME }}p)
                </a>
                <div class="collapsible-body">
                    <ul>
                        <li>
                            {% if skills.S_TIME >= Math.ceil(skills.PLAYERLEVEL / 3) %}
                                <a class="timeBtn modal-trigger waves-effect waves-cyan">
                                    <i class="material-icons left">repeat_one</i>
                                    Use ({{ Math.ceil(skills.PLAYERLEVEL / 3) }}p)
                                </a>
                            {% else %}
                                <a class="addTimeButton waves-effect waves-cyan">
                                    <i class="material-icons left">trending_up</i>
                                    You need ({{ Math.ceil(skills.PLAYERLEVEL / 3) }}p)
                                </a>
                            {% endif %}
                        </li>
                        {% if skills.SKILLPOINTS > 0 %}
                            <li>
                                <a class="waves-effect waves-light addSkillPoint" skill="S_TIME">
                                    <i class="material-icons left" style="cursor: pointer">add</i>
                                    Add Skill
                                </a>
                            </li>
                        {% endif %}
                    </ul>
                </div>
            </li>
        </ul>
    </li>
    <li class="divider"></li>
</span>
