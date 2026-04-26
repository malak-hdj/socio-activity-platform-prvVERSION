<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Activite::all()
        ]);
    }
    public function show($id)
{
    $activity = Activite::findOrFail($id);

    return response()->json([
        'success' => true,
        'data' => $activity
    ]);
}

public function store(Request $request)
{
    $activity = Activite::create($request->all());

    return response()->json([
        'success' => true,
        'data' => $activity
    ], 201);
}

public function update(Request $request, $id)
{
    $activity = Activite::findOrFail($id);
    $activity->update($request->all());

    return response()->json([
        'success' => true,
        'data' => $activity
    ]);
}

public function destroy($id)
{
    $activity = Activite::findOrFail($id);
    $activity->delete();

    return response()->json([
        'success' => true,
        'message' => 'Activity deleted successfully'
    ]);
}
}