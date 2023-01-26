'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">utopia documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c6e6e571236b7ebe57ee1276c461aa3eb6535c83bd53412fa10276e4da8fb2d631439becb20f4377f6c08bdd242f74e11f1b40fdbf96a019a67714b919e4fc38"' : 'data-target="#xs-components-links-module-AppModule-c6e6e571236b7ebe57ee1276c461aa3eb6535c83bd53412fa10276e4da8fb2d631439becb20f4377f6c08bdd242f74e11f1b40fdbf96a019a67714b919e4fc38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c6e6e571236b7ebe57ee1276c461aa3eb6535c83bd53412fa10276e4da8fb2d631439becb20f4377f6c08bdd242f74e11f1b40fdbf96a019a67714b919e4fc38"' :
                                            'id="xs-components-links-module-AppModule-c6e6e571236b7ebe57ee1276c461aa3eb6535c83bd53412fa10276e4da8fb2d631439becb20f4377f6c08bdd242f74e11f1b40fdbf96a019a67714b919e4fc38"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTemplateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormTemplateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LocalStorageModule.html" data-type="entity-link" >LocalStorageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-2bea35947eac106fde7a60100f3943ffb415d1aa3f21e4ea6d3694406cbd0f4b623ffc359ed9c6a72110b904340dcfa61c2e598071d052a56271aacb8684f0d2"' : 'data-target="#xs-components-links-module-LoginModule-2bea35947eac106fde7a60100f3943ffb415d1aa3f21e4ea6d3694406cbd0f4b623ffc359ed9c6a72110b904340dcfa61c2e598071d052a56271aacb8684f0d2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-2bea35947eac106fde7a60100f3943ffb415d1aa3f21e4ea6d3694406cbd0f4b623ffc359ed9c6a72110b904340dcfa61c2e598071d052a56271aacb8684f0d2"' :
                                            'id="xs-components-links-module-LoginModule-2bea35947eac106fde7a60100f3943ffb415d1aa3f21e4ea6d3694406cbd0f4b623ffc359ed9c6a72110b904340dcfa61c2e598071d052a56271aacb8684f0d2"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetrolineModule.html" data-type="entity-link" >MetrolineModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MetrolineModule-cfb7b4171da4fc65f1d8c810121391ceb83e4fe8506037d75f1a51fdafb9836d8208473ff7af561f137db31bfd473960c2da6834601e88ad3d8bf95235c894bb"' : 'data-target="#xs-injectables-links-module-MetrolineModule-cfb7b4171da4fc65f1d8c810121391ceb83e4fe8506037d75f1a51fdafb9836d8208473ff7af561f137db31bfd473960c2da6834601e88ad3d8bf95235c894bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetrolineModule-cfb7b4171da4fc65f1d8c810121391ceb83e4fe8506037d75f1a51fdafb9836d8208473ff7af561f137db31bfd473960c2da6834601e88ad3d8bf95235c894bb"' :
                                        'id="xs-injectables-links-module-MetrolineModule-cfb7b4171da4fc65f1d8c810121391ceb83e4fe8506037d75f1a51fdafb9836d8208473ff7af561f137db31bfd473960c2da6834601e88ad3d8bf95235c894bb"' }>
                                        <li class="link">
                                            <a href="injectables/MetrolineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetrolineService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PointsModule.html" data-type="entity-link" >PointsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RailMapModule.html" data-type="entity-link" >RailMapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RailMapModule-9ba7f74bf57f1d7b08cf9dd09333f12935da9c581671075099089fe4aa52ac1b3ce7099085f2178b26fe12ea2d98ab3c6fb143123ba2a69521cc933defe040f0"' : 'data-target="#xs-components-links-module-RailMapModule-9ba7f74bf57f1d7b08cf9dd09333f12935da9c581671075099089fe4aa52ac1b3ce7099085f2178b26fe12ea2d98ab3c6fb143123ba2a69521cc933defe040f0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RailMapModule-9ba7f74bf57f1d7b08cf9dd09333f12935da9c581671075099089fe4aa52ac1b3ce7099085f2178b26fe12ea2d98ab3c6fb143123ba2a69521cc933defe040f0"' :
                                            'id="xs-components-links-module-RailMapModule-9ba7f74bf57f1d7b08cf9dd09333f12935da9c581671075099089fe4aa52ac1b3ce7099085f2178b26fe12ea2d98ab3c6fb143123ba2a69521cc933defe040f0"' }>
                                            <li class="link">
                                                <a href="components/MetrolineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetrolineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeighbourhoodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NeighbourhoodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PointsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PointsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CoordinatesService.html" data-type="entity-link" >CoordinatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormService.html" data-type="entity-link" >FormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraduateProgramService.html" data-type="entity-link" >GraduateProgramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetrolineService.html" data-type="entity-link" >MetrolineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PointsService.html" data-type="entity-link" >PointsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StationService.html" data-type="entity-link" >StationService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Answer.html" data-type="entity-link" >Answer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Building.html" data-type="entity-link" >Building</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Faculty.html" data-type="entity-link" >Faculty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraduateProgram.html" data-type="entity-link" >GraduateProgram</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultipleChoiceAnswer.html" data-type="entity-link" >MultipleChoiceAnswer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Question.html" data-type="entity-link" >Question</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Station.html" data-type="entity-link" >Station</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});