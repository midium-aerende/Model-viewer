import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

// Create a green basic material
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

// Loader setup for GLTF model
const loader = new GLTFLoader();

let model = null; // Variable to store the loaded model

loader.load( './model.glb', function ( gltf ) {
    model = gltf.scene;  // Store the model

    // Traverse through the model's children and apply the material to all meshes
    model.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material = material;
        }
    });

    scene.add( model );  // Add the model to the scene
}, undefined, function ( error ) {
    console.error( error );
});

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {
    if (model) {
        // Rotate the model based on time
        model.rotation.x = time / 2000;
        model.rotation.y = time / 1000;
    }

    renderer.render( scene, camera );
}
