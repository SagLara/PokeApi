import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg  = '';
  pokemonAbi = [];

  constructor(private pokeService: PokemonService, private activatedRouter: ActivatedRoute) {
      this.activatedRouter.params.subscribe(
        params => {
          this.getPokemon(params['id']);
        }
      );
  }

  ngOnInit(): void {
  }

  getPokemon(id){
    this.pokeService.getPokemons(id).subscribe(
      res =>{
        console.log(res);
        this.pokemon= res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        for (let i=0;i<res.types.length;i++){
            this.pokemonType[i] = res.types[i].type.name;
        }
        for (let i=0;i<res.abilities.length;i++){
          this.pokemonAbi[i] = res.abilities[i].ability.name;
      }
        console.log(this.pokemonType);
      },
      err => {

      }
    );
  }

}
