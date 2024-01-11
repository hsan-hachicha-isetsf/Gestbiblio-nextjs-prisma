"use client"
import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Image from "next/image"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
const ListLivres = ({livres}) => {
    const[searchTitre,setsearchTitre]=useState()
const[livresdata,setLivresData]=useState(livres)
    const handlefind = (e) => {
        const searchTerm = e.target.value;
        setsearchTitre(searchTerm);
        if (searchTerm === '') {
        setLivresData(livres);
        } else {
        setLivresData(livres.filter((item) => {
        return item.titre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        }));
        }
        };
    const columns = useMemo(
        () => [
        {
        accessorKey: 'couverture',
        header: 'Image',
        Cell: ({ cell}) => (
        <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        }}
        >
        <Image
        src={cell.getValue()}
        alt="livre image"
        height="100"
        width="100"
        style={{maxWidth:'100px', maxHeight: "100px" }}
        />
        </Box>),
        },
        {
        accessorKey: 'isbn',
        header: 'ISBN',
        size: 100,
        },
        {
        accessorKey: 'titre',
        header: 'TITRE',
        size: 100,
        },
        {
        accessorKey: 'editeurs.maisonedit',
        header: 'Editeur',
        size: 100,
        },
        {
        accessorKey: 'annedition',
        header: 'Année Edition',
        size: 100,
        },
        {
        accessorKey: 'prix',
        header: 'Prix',
        size: 100,
        },
        {
        accessorKey: 'qtestock',
        header: 'Stock',
        size: 100,
        },
        {
        accessorKey: 'specialites.nomspecialite',
        header: 'Spécialité',
        size: 100,
        },
        {
        accessorFn: (originalRow) => originalRow.livre_auteur.map((aut,i)=>{
        return <div key={i}>{aut.auteurs.nomauteur}</div>
        }),
        id: 'aut.auteurs.id',
        header: 'Auteurs',
        },
        ],
        [livresdata],
        );
        
return (
<div className="container">
<h1 className="text-3xl font-semibold">Liste des livres</h1>
<form className="row">
<div className="col-md-4 d-flex align-items-center">
<span class="input-group-text"><ManageSearchIcon/></span>
<input className="form-control col-md-2" type="search" placeholder="Raccourci
Filtre Titre" aria-label="Search" value={searchTitre} onChange={(e)=>handlefind(e)}/>
</div>
</form>
<MaterialReactTable columns={columns} data={livresdata} />
</div>

)
}
export default ListLivres