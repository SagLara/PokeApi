import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['posicion', 'imagen', 'nombre', 'tipo'];
  //displayedColumns: string[] = ['posicion', 'imagen', 'nombre'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    let pokeData;
    for (let i=1 ; i<=150; i++){
      this.pokeService.getPokemons(i).subscribe(
        res => {
          //console.log(res);
          pokeData = {
            posicion: i,
            imagen: res.sprites.front_default,
            nombre: res.name,
            tipo: res.types[0].type.name
          };
          this.data.push(pokeData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row){
    //console.log(row);
    this.router.navigateByUrl(`pokeDetail/${row.posicion}`)
  }

}
