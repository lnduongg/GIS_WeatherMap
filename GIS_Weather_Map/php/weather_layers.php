<div id="weatherLayerButtons">
    <button id="temperatureButton">Nhiệt độ</button>
    <button id="cloudsButton">Mây</button>
    <button id="windButton">Gió</button>
    <button id="precipitationButton">Mưa</button>
    <button id="pressureButton">Áp suất</button>
</div>

<div id="opacitySliders">
    <div id="cloudsOpacitySlider" class="opacity-slider hidden">
        <input type="range" min="0" max="1" step="0.01" value="1">
    </div>
    <div id="temperatureOpacitySlider" class="opacity-slider hidden">
        <input type="range" min="0" max="1" step="0.01" value="1">
    </div>
    <div id="windOpacitySlider" class="opacity-slider hidden">
        <input type="range" min="0" max="1" step="0.01" value="1">
    </div>
    <div id="precipitationOpacitySlider" class="opacity-slider hidden">
        <input type="range" min="0" max="1" step="0.01" value="1">
    </div>
    <div id="pressureOpacitySlider" class="opacity-slider hidden">
        <input type="range" min="0" max="1" step="0.01" value="1">
    </div>
</div>


<div id="temperatureLegend" class="legend hidden">
    <span>°C</span>
    <div class="gradient">
        <div class="labels">
            <span>-40</span>
            <span>-30</span>
            <span>-20</span>
            <span>-10</span>
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
        </div>
    </div>
</div>

<div id="cloudsLegend" class="legend hidden">
    <span>%</span>
    <div class="gradient">
        <div class="labels">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
        </div>
    </div>
</div>

<div id="windLegend" class="legend hidden">
    <span>m/s</span>
    <div class="gradient">
        <div class="labels">
            <span>0</span>
            <span>2</span>
            <span>3</span>
            <span>6</span>
            <span>12</span>
            <span>25</span>
            <span>50</span>
            <span>100</span>
        </div>
    </div>
</div>

<div id="precipitationLegend" class="legend hidden">
    <span>mm/h</span>
    <div class="gradient">
        <div class="labels">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>7</span>
            <span>10</span>
            <span>12</span>
            <span>14</span>
            <span>16</span>
            <span>24</span>
            <span>32</span>
            <span>60</span>
        </div>
    </div>
</div>

<div id="pressureLegend" class="legend hidden">
    <span>hPa</span>
    <div class="gradient">
        <div class="labels">
            <span>950</span>
            <span>980</span>
            <span>1010</span>
            <span>1040</span>
            <span>1070</span>
        </div>
    </div>
</div>
